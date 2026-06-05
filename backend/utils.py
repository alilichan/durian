import random

def predict_image(image_path):

    ripe = random.choice([True, False])

    confidence = random.randint(85, 98)

    grade = random.choice(["A", "B", "C"])

    sweetness = random.randint(75, 95)

    freshness = random.randint(70, 100)

    texture = random.randint(70, 100)

    return {
        "prediction": "Ripe" if ripe else "Unripe",
        "confidence": confidence,
        "grade": grade,
        "sweetness": sweetness,
        "freshness": freshness,
        "texture": texture,
        "recommendation":
            "Ready for consumption within 24 hours."
            if ripe
            else
            "Allow additional ripening."
    }