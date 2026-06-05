from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import io

app = FastAPI()

# ✅ CORS — allows your React dev server (localhost:5173) to call this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # add your prod URL here later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Model setup ────────────────────────────────────────────────────────────────
CLASS_NAMES = ["Good", "Average", "Bad"]   # must match training order
MODEL_PATH  = "durian_model.pth"           # path relative to where you run the server

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

def load_model():
    model = models.resnet18(weights=None)
    model.fc = nn.Linear(model.fc.in_features, len(CLASS_NAMES))
    state = torch.load(MODEL_PATH, map_location=device)
    # handle both raw state_dict and a full checkpoint dict
    if isinstance(state, dict) and "model_state_dict" in state:
        state = state["model_state_dict"]
    model.load_state_dict(state)
    model.to(device)
    model.eval()
    return model

model = load_model()

# ── Preprocessing — same as training ──────────────────────────────────────────
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225]),
])

# ── Routes ─────────────────────────────────────────────────────────────────────
@app.get("/")
def root():
    return {"status": "Durian AI backend is running 🍈"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # validate file type
    if not file.content_type.startswith("image/"):
        return JSONResponse(status_code=400,
                            content={"error": "Please upload an image file."})

    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")
    tensor = transform(image).unsqueeze(0).to(device)   # (1, 3, 224, 224)

    with torch.no_grad():
        outputs = model(tensor)                          # (1, 3)
        probs   = torch.softmax(outputs, dim=1)[0]       # (3,)
        pred_idx = probs.argmax().item()

    result = {
        "prediction": CLASS_NAMES[pred_idx],
        "confidence": round(probs[pred_idx].item() * 100, 1),
        "probabilities": {
            name: round(probs[i].item() * 100, 1)
            for i, name in enumerate(CLASS_NAMES)
        },
    }
    return JSONResponse(content=result)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)