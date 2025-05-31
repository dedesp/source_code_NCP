from fastapi import APIRouter
from typing import Dict, Any

router = APIRouter()

@router.get("/stats")
async def get_dashboard_stats() -> Dict[str, Any]:
    """Endpoint untuk data dashboard utama yang dipanggil frontend"""
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
        },
        "trending_keywords": [
            {"keyword": "NasDem Bandung", "mentions": 3245, "sentiment": "positive"},
            {"keyword": "Banjir Bandung", "mentions": 2156, "sentiment": "negative"},
            {"keyword": "UMKM Bandung", "mentions": 1847, "sentiment": "positive"},
            {"keyword": "Infrastruktur", "mentions": 1456, "sentiment": "neutral"},
            {"keyword": "Kesehatan", "mentions": 1234, "sentiment": "positive"}
        ]
    }

@router.get("/sentiment-trend")
async def get_sentiment_trend(period: str = "7d") -> Dict[str, Any]:
    """Data untuk chart tren sentimen"""
    return {
        "labels": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        "datasets": [
            {
                "label": "Positif",
                "data": [65, 59, 80, 81, 56, 55, 67],
                "borderColor": "#10B981",
                "backgroundColor": "rgba(16, 185, 129, 0.1)",
                "tension": 0.4
            },
            {
                "label": "Negatif", 
                "data": [28, 48, 40, 35, 44, 35, 28],
                "borderColor": "#EF4444",
                "backgroundColor": "rgba(239, 68, 68, 0.1)",
                "tension": 0.4
            },
            {
                "label": "Netral",
                "data": [7, 13, 20, 16, 20, 10, 5],
                "borderColor": "#6B7280",
                "backgroundColor": "rgba(107, 114, 128, 0.1)", 
                "tension": 0.4
            }
        ]
    }