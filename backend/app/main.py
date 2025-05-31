from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="PASIP-AI Backend")

# CORS untuk frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500", "http://localhost:3000", "http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "PASIP-AI Backend Running!"}

@app.get("/api/v1/dashboard/stats")
def get_dashboard_stats():
    return {
        "total_mentions": 15847,
        "sentiment_distribution": {
            "positive": 45.2,
            "negative": 28.8,
            "neutral": 26.0
        },
        "platforms": {
            "twitter": 8500,
            "facebook": 3200,
            "instagram": 2100,
            "news": 2047
        }
    }
