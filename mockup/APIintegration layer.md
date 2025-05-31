# API untuk connect frontend dengan backend
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

@app.get("/api/sentiment-data")
async def get_sentiment_data(keyword: str = None, date_range: str = None):
    # Fetch processed data from database
    # Return JSON for frontend charts
    pass

@app.get("/api/trending-topics")
async def get_trending_topics():
    # Return trending topics analysis
    pass

@app.post("/api/keywords")
async def add_keyword(keyword_data: dict):
    # Add new keyword to monitoring
    pass