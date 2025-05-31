from fastapi import APIRouter, Query
from typing import Dict, Any, List, Optional
from datetime import datetime, timedelta

router = APIRouter()

@router.get("/trending")
async def get_trending_topics(
    limit: int = Query(10, ge=1, le=50),
    period: str = Query("24h", regex="^(1h|6h|12h|24h|7d|30d)$")
) -> Dict[str, Any]:
    """Get trending topics berdasarkan period tertentu"""
    return {
        "period": period,
        "total_topics": 25,
        "topics": [
            {
                "id": "topic_1",
                "name": "Infrastruktur Bandung",
                "mentions": 3245,
                "sentiment_score": 0.65,
                "sentiment_distribution": {
                    "positive": 55.2,
                    "negative": 22.8,
                    "neutral": 22.0
                },
                "keywords": ["jalan", "jembatan", "bandung", "infrastruktur", "pembangunan"],
                "platforms": {
                    "twitter": 1200,
                    "facebook": 800,
                    "instagram": 600,
                    "news": 645
                },
                "trending_score": 8.7,
                "first_seen": "2025-05-30T10:00:00Z",
                "last_updated": "2025-05-31T08:30:00Z"
            },
            {
                "id": "topic_2", 
                "name": "UMKM Digital",
                "mentions": 2156,
                "sentiment_score": 0.78,
                "sentiment_distribution": {
                    "positive": 68.5,
                    "negative": 15.2,
                    "neutral": 16.3
                },
                "keywords": ["umkm", "digital", "online", "marketplace", "ekonomi"],
                "platforms": {
                    "twitter": 800,
                    "facebook": 650,
                    "instagram": 456,
                    "news": 250
                },
                "trending_score": 7.9,
                "first_seen": "2025-05-30T14:20:00Z", 
                "last_updated": "2025-05-31T09:15:00Z"
            },
            {
                "id": "topic_3",
                "name": "Banjir Citarum",
                "mentions": 1847,
                "sentiment_score": -0.45,
                "sentiment_distribution": {
                    "positive": 18.2,
                    "negative": 65.8,
                    "neutral": 16.0
                },
                "keywords": ["banjir", "citarum", "jakarta", "hujan", "bencana"],
                "platforms": {
                    "twitter": 900,
                    "facebook": 520,
                    "instagram": 200,
                    "news": 227
                },
                "trending_score": 6.8,
                "first_seen": "2025-05-31T02:00:00Z",
                "last_updated": "2025-05-31T09:45:00Z"
            }
        ]
    }

@router.get("/keywords")
async def get_trending_keywords(
    limit: int = Query(20, ge=1, le=100),
    category: Optional[str] = Query(None, regex="^(politik|ekonomi|sosial|infrastruktur|all)$")
) -> Dict[str, Any]:
    """Get trending keywords dengan category filter"""
    return {
        "category": category or "all",
        "total_keywords": 150,
        "keywords": [
            {
                "keyword": "bandung",
                "mentions": 5420,
                "sentiment_score": 0.32,
                "trending_score": 9.2,
                "category": "politik",
                "growth_rate": 23.5,
                "related_topics": ["Infrastruktur Bandung", "UMKM Digital"],
                "platforms": {"twitter": 2100, "facebook": 1800, "instagram": 1020, "news": 500}
            },
            {
                "keyword": "umkm",
                "mentions": 3890,
                "sentiment_score": 0.67,
                "trending_score": 8.8,
                "category": "ekonomi", 
                "growth_rate": 45.2,
                "related_topics": ["UMKM Digital", "Ekonomi Kreatif"],
                "platforms": {"twitter": 1500, "facebook": 1200, "instagram": 890, "news": 300}
            },
            {
                "keyword": "infrastruktur",
                "mentions": 3245,
                "sentiment_score": 0.55,
                "trending_score": 8.1,
                "category": "infrastruktur",
                "growth_rate": 12.8,
                "related_topics": ["Infrastruktur Bandung", "Pembangunan Jalan"],
                "platforms": {"twitter": 1200, "facebook": 900, "instagram": 645, "news": 500}
            }
        ]
    }

@router.get("/{topic_id}")
async def get_topic_detail(topic_id: str) -> Dict[str, Any]:
    """Get detailed information untuk topic tertentu"""
    return {
        "id": topic_id,
        "name": "Infrastruktur Bandung",
        "description": "Diskusi mengenai pembangunan dan perbaikan infrastruktur di Kota Bandung",
        "mentions": 3245,
        "sentiment_score": 0.65,
        "sentiment_distribution": {
            "positive": 55.2,
            "negative": 22.8, 
            "neutral": 22.0
        },
        "timeline": [
            {"date": "2025-05-27", "mentions": 145, "sentiment": 0.23},
            {"date": "2025-05-28", "mentions": 234, "sentiment": 0.45},
            {"date": "2025-05-29", "mentions": 567, "sentiment": 0.67},
            {"date": "2025-05-30", "mentions": 892, "sentiment": 0.72},
            {"date": "2025-05-31", "mentions": 1407, "sentiment": 0.65}
        ],
        "top_posts": [
            {
                "id": "post_1",
                "platform": "twitter",
                "content": "Pembangunan jalan tol Bandung-Jakarta semakin membaik, akses transportasi jadi lebih lancar!",
                "author": "@user123",
                "sentiment": "positive",
                "engagement": 245,
                "timestamp": "2025-05-31T08:30:00Z"
            }
        ],
        "related_keywords": ["jalan", "jembatan", "bandung", "infrastruktur", "pembangunan"],
        "geographic_distribution": {
            "bandung": 65.4,
            "jakarta": 23.1, 
            "bekasi": 8.2,
            "bogor": 3.3
        }
    }

@router.get("/sentiment/analysis")
async def get_topic_sentiment_analysis(
    topic_ids: List[str] = Query(...),
    period: str = Query("7d")
) -> Dict[str, Any]:
    """Analisis sentimen untuk multiple topics"""
    return {
        "period": period,
        "topics_analyzed": len(topic_ids),
        "analysis": [
            {
                "topic_id": tid,
                "sentiment_trend": [
                    {"date": "2025-05-25", "positive": 45, "negative": 30, "neutral": 25},
                    {"date": "2025-05-26", "positive": 50, "negative": 28, "neutral": 22},
                    {"date": "2025-05-27", "positive": 55, "negative": 25, "neutral": 20}
                ]
            } for tid in topic_ids
        ]
    }