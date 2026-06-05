# Durian AI 🍈

## AI-Powered Musang King Quality Assessment

Durian AI is an end-to-end computer vision application that automates the assessment of Musang King durian quality using shell images.

The project combines Vision-Language Models, rule-based quality scoring, and deep learning image classification to predict whether a Musang King durian is:

- 🟢 Good
- 🟡 Average
- 🔴 Bad

Built for the UCWS Singapore Hackathon 2026.

---

# Problem Statement

Assessing Musang King quality traditionally relies on manual inspection and experience.

External characteristics such as shape, stem condition, shell appearance, spikes, and visible cracks are commonly used as indicators of quality. However, this process can be subjective, inconsistent, and time-consuming.

Durian AI explores whether computer vision can assist in automating this assessment process using only shell images.

---

# Solution

Our solution uses a multi-stage pipeline:

1. Feature Extraction using a Vision-Language Model
2. Rule-Based Quality Scoring
3. Deep Learning Classification using ResNet18
4. User-Friendly Web Interface

The generated labels are then used to train a model capable of predicting quality directly from images.

---

# System Architecture

```text
Musang King Image
        ↓
React Frontend
        ↓
Python Backend
        ↓
AI Quality Assessment Model
        ↓
Quality Prediction
        ↓
Displayed to User
```

---

# AI Pipeline

```text
Musang King Image
        ↓
Vision-Language Model
        ↓
Feature Extraction
        ↓
Rule-Based Scoring
        ↓
Generated Labels
        ↓
ResNet18 Training
        ↓
Quality Prediction
```

---

# Feature Extraction

A Vision-Language Model analyses each Musang King image and extracts visible shell characteristics.

Features include:

- Shape
- Stem Condition
- Shell Condition
- Spike Condition
- Star-Bottom Visibility
- Surface Cracks

Example output:

```json
{
  "shape": "Round",
  "stem": "Fresh",
  "shell": "Clean",
  "spikes": "Firm",
  "star_bottom": "Visible",
  "cracks": "Small/None"
}
```

---

# Rule-Based Quality Scoring

The extracted characteristics are converted into quality labels using a scoring system.

| Feature | Condition | Points |
|----------|-----------|---------|
| Shape | Round | +2 |
| Stem | Fresh | +2 |
| Stem | Unknown | +1 |
| Shell | Clean | +2 |
| Spikes | Firm | +2 |
| Star Bottom | Visible | +2 |
| Cracks | Small/None | +2 |

### Quality Categories

| Score | Classification |
|---------|---------|
| 11 - 12 | Good |
| 8 - 10 | Average |
| 0 - 7 | Bad |

---

# Model Training

A pretrained ResNet18 model was used through transfer learning.

The final classification layer was modified to predict:

- Good
- Average
- Bad

The model was trained using the automatically generated labels.

---

# Web Application

The project includes a complete web interface.

### Frontend

- React
- Vite

### Backend

- Python
- FastAPI / Flask Backend
- PyTorch Inference Pipeline

### Workflow

1. User uploads a Musang King image.
2. Image is sent to the backend.
3. AI model performs quality assessment.
4. Predicted quality category is returned.
5. Result is displayed in the browser.

---

# Repository Structure

```text
durian-ai/
│
├── backend/
│   ├── main.py
│   ├── model.py
│   ├── utils.py
│   └── uploads/
│
├── frontend-react/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── durian_ai.ipynb
├── labelimages.py
├── goodorbad.py
├── durian_model.pth
├── requirements.txt
└── README.md
```

---

# Key Files

| File | Description |
|--------|---------|
| durian_ai.ipynb | Model training notebook |
| labelimages.py | Vision-Language Model feature extraction |
| goodorbad.py | Rule-based quality scoring |
| backend/main.py | Backend API |
| backend/model.py | Model loading and inference |
| frontend-react | React frontend |
| durian_model.pth | Trained model weights |

---

# Running Locally

## Backend

```bash
cd backend

pip install -r requirements.txt

python main.py
```

---

## Frontend

```bash
cd frontend-react

npm install

npm run dev
```

---

## Open Application

```text
http://localhost:5173
```

---

# Dataset

The dataset consists of Musang King durian images.

As the images did not originally contain quality labels, labels were generated automatically through:

1. Vision-Language Model feature extraction
2. Rule-based scoring

This allowed the creation of a labelled dataset without manual annotation.

---

# Results

The project successfully demonstrates:

✅ Automated feature extraction

✅ Automated label generation

✅ Rule-based quality scoring

✅ Deep learning classification

✅ End-to-end Musang King quality prediction

✅ Working local web application

The workflow significantly reduces manual labelling effort and provides a foundation for AI-assisted durian grading.

---

# Potential Applications

- Orchard quality monitoring
- Wholesale quality screening
- Retail quality verification
- Consumer quality assessment
- AI-assisted durian grading

---

# Current Status

✅ Dataset generation pipeline completed

✅ Rule-based quality scoring completed

✅ ResNet18 model training completed

✅ React frontend completed

✅ Python backend completed

✅ Local deployment completed

🔄 Cloud deployment planned for future work

---

# Future Improvements

- Larger training dataset
- Expert-verified labels
- Multi-angle image assessment
- Additional durian varieties
- Mobile application deployment
- Cloud hosting

---

# Team

- Alicia Ong
- Jeremy Ng

### Built With

- Python
- PyTorch
- Pandas
- React
- Vite
- Computer Vision
- Vision-Language Models
- Deep Learning
