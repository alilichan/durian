
import os
import base64
import requests
import pandas as pd
import json
import re

LM_STUDIO_URL = "http://192.168.1.97:1234/v1/chat/completions"

MAX_IMAGES = 500

results = []
processed = 0

for root, dirs, files in os.walk("."):

    for filename in files:

        if not filename.lower().endswith(
            (".jpg", ".jpeg", ".png", ".webp")
        ):
            continue

        image_path = os.path.join(root, filename)

        print(f"Processing {image_path}")

        try:

            with open(image_path, "rb") as f:
                image_base64 = base64.b64encode(
                    f.read()
                ).decode("utf-8")

            payload = {
                "model": "qwen2.5-vl-7b-instruct",
                "messages": [
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "text",
                                "text": """
Analyze this Musang King durian shell.

Choose ONLY one option for each field.

{
 "shape":"Round or Irregular",
 "stem":"Fresh or Dry or Unknown",
 "shell":"Clean or Damaged",
 "spikes":"Firm or Flattened",
 "star_bottom":"Visible or Not Visible",
 "cracks":"Small/None or Large"
}

Return ONLY valid JSON.
"""
                            },
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": f"data:image/jpeg;base64,{image_base64}"
                                }
                            }
                        ]
                    }
                ],
                "temperature": 0
            }

            response = requests.post(
                LM_STUDIO_URL,
                json=payload,
                timeout=300
            )

            if response.status_code != 200:
                print("API Error:", response.text)
                continue

            content = response.json()[
                "choices"
            ][0]["message"]["content"]

            print(content)

            # Remove markdown wrappers
            content = re.sub(
                r"^`json\s*",
                "",
                content
            )

            content = re.sub(
                r"`$",
                "",
                content
            )

            content = content.strip()

            labels = json.loads(content)

            results.append({
                "filepath": image_path,
                "shape": labels.get("shape"),
                "stem": labels.get("stem"),
                "shell": labels.get("shell"),
                "spikes": labels.get("spikes"),
                "star_bottom": labels.get("star_bottom"),
                "cracks": labels.get("cracks")
            })

            pd.DataFrame(results).to_csv(
                "labels_500.csv",
                index=False
            )

            print("✓ Saved")

        except Exception as e:
            print("✗ Error:", e)

        processed += 1

        if processed >= MAX_IMAGES:
            print("\nReached 500-image limit.")
            break

    if processed >= MAX_IMAGES:
        break

print("\nFinished")
print("Images processed:", processed)
print("Rows saved:", len(results))
