import json
import os

RAW_DATA_DIR = "data/raw"
PROCESSED_DATA_FILE = "data/processed/qa_dataset.jsonl"

os.makedirs("data/processed", exist_ok=True)

def process_json_file(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    processed_entries = []
    for entry in data:
        question = entry.get("question", "").strip()
        answers = entry.get("answers", [])

        if not question or len(answers) < 2:
            continue  # Skip incomplete entries

        patient_answer = answers[0].strip()
        doctor_answer = answers[1].strip()

        processed_entries.append({
            "question": question,
            "patient_answer": patient_answer,
            "doctor_answer": doctor_answer
        })
    return processed_entries

all_entries = []
for file_name in os.listdir(RAW_DATA_DIR):
    if file_name.endswith(".json"):
        file_path = os.path.join(RAW_DATA_DIR, file_name)
        entries = process_json_file(file_path)
        all_entries.extend(entries)

with open(PROCESSED_DATA_FILE, "w", encoding="utf-8") as f:
    for entry in all_entries:
        f.write(json.dumps(entry, ensure_ascii=False) + "\n")

print(f"Processed {len(all_entries)} entries and saved to {PROCESSED_DATA_FILE}")
