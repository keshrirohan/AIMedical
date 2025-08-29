# backend/main.py
import json
import sys
import faiss
from sentence_transformers import SentenceTransformer

VECTOR_STORE_FILE = "backend/vector_store/faiss_index.bin"
DATASET_FILE = "backend/vector_store/dataset.json"
EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
TOP_K = 1

# Load FAISS index
index = faiss.read_index(VECTOR_STORE_FILE)

# Load dataset
with open(DATASET_FILE, "r", encoding="utf-8") as f:
    dataset = json.load(f)

# Load embedding model
model = SentenceTransformer(EMBEDDING_MODEL)

def get_answer(query):
    q_emb = model.encode([query], convert_to_numpy=True)
    D, I = index.search(q_emb, TOP_K)
    idx = I[0][0]
    entry = dataset[idx]
    return {
        "question": entry.get("question", ""),
        "patient_answer": entry.get("patient_answer", ""),
        "doctor_answer": entry.get("doctor_answer", "")
    }

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No question provided"}))
        sys.exit(1)

    query = sys.argv[1]
    try:
        ans = get_answer(query)
        # 👇 print clean JSON only
        print(json.dumps(ans, ensure_ascii=False))
    except Exception as e:
        # if error occurs, still return JSON
        print(json.dumps({"error": str(e)}))
        sys.exit(1)
