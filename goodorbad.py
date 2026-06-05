import pandas as pd

df = pd.read_csv("labels_500.csv")

def score_row(row):
    score = 0

    # Shape
    if row["shape"] == "Round":
        score += 2

    # Stem
    if row["stem"] == "Fresh":
        score += 2
    elif row["stem"] == "Unknown":
        score += 1

    # Shell
    if row["shell"] == "Clean":
        score += 2

    # Spikes
    if row["spikes"] == "Firm":
        score += 2

    # Star Bottom
    if row["star_bottom"] == "Visible":
        score += 2

    # Cracks
    if row["cracks"] == "Small/None":
        score += 2

    return score

df["score"] = df.apply(score_row, axis=1)

def grade(score):
    if score >= 11:
        return "Good"
    elif score >= 8:
        return "Average"
    else:
        return "Bad"

df["quality"] = df["score"].apply(grade)

df.to_csv("durian_quality_375.csv", index=False)

print(df[["filepath", "score", "quality"]])