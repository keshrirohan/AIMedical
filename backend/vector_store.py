import json
import os
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

DATA_FILE = "data/processed/qa_dataset.jsonl"
VECTOR_STORE_FILE = "backend/vector_store/faiss_index.bin"
EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"

os.makedirs("backend/vector_store", exist_ok=True)

# Load data
dataset = []
with open(DATA_FILE, "r", encoding="utf-8") as f:
    for line in f:
        dataset.append(json.loads(line))

# Initialize embedding model
model = SentenceTransformer(EMBEDDING_MODEL)

# Create embeddings
questions = [entry["question"] for entry in dataset]
embeddings = model.encode(questions, convert_to_numpy=True)

# FAISS index
d = embeddings.shape[1]
index = faiss.IndexFlatL2(d)
index.add(embeddings)

# Save FAISS index and dataset mapping
faiss.write_index(index, VECTOR_STORE_FILE)
with open("backend/vector_store/dataset.json", "w", encoding="utf-8") as f:
    json.dump(dataset, f, ensure_ascii=False)

print(f"FAISS index saved to {VECTOR_STORE_FILE}")
