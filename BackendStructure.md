# Backend Architecture - Platform Analisis Sentimen & Isu Publik (PASIP-AI)

## 📋 Overview
Backend system untuk mendukung scraping otomatis, analisis sentimen, dan penyediaan data untuk frontend dashboard.

## 🏗️ Architecture Diagram
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Data Sources  │    │  Scraping Layer │    │ Processing Layer│
│                 │    │                 │    │                 │
│ • News Websites │───▶│ • Web Scrapers  │───▶│ • Sentiment AI  │
│ • Social Media  │    │ • API Crawlers  │    │ • Topic Extract │
│ • Forums        │    │ • RSS Feeds     │    │ • Data Clean    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                        │
┌─────────────────┐    ┌─────────────────┐             │
│   Frontend UI   │    │   API Layer     │             │
│                 │    │                 │             │
│ • Dashboard     │◀───│ • REST APIs     │◀────────────┘
│ • Charts        │    │ • WebSocket     │
│ • Reports       │    │ • Authentication│
└─────────────────┘    └─────────────────┘
                                │
                       ┌─────────────────┐
                       │   Database      │
                       │                 │
                       │ • MongoDB       │
                       │ • InfluxDB      │
                       │ • Redis Cache   │
                       └─────────────────┘
```

## 🛠️ Technology Stack

### **Core Technologies**
- **Runtime**: Python 3.9+
- **Web Framework**: FastAPI
- **Task Queue**: Celery + Redis
- **Web Scraping**: Scrapy + BeautifulSoup + Selenium
- **AI/NLP**: spaCy + Transformers + TextBlob
- **Database**: MongoDB + InfluxDB + Redis
- **Deployment**: Docker + Docker Compose
- **Monitoring**: Prometheus + Grafana

### **External APIs**
- **Twitter API v2**: Tweet collection
- **Facebook Graph API**: Post collection  
- **Instagram Basic Display API**: Content monitoring
- **YouTube Data API**: Video/comment analysis
- **News API**: News aggregation

## 📁 Project Structure
```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI application entry
│   ├── config/
│   │   ├── __init__.py
│   │   ├── settings.py         # Environment configs
│   │   └── database.py         # DB connections
│   ├── api/
│   │   ├── __init__.py
│   │   ├── v1/
│   │   │   ├── __init__.py
│   │   │   ├── endpoints/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── dashboard.py
│   │   │   │   ├── keywords.py
│   │   │   │   ├── sentiment.py
│   │   │   │   ├── topics.py
│   │   │   │   ├── influencers.py
│   │   │   │   ├── reports.py
│   │   │   │   └── comparison.py
│   │   │   └── api.py
│   │   └── deps.py             # Dependencies
│   ├── core/
│   │   ├── __init__.py
│   │   ├── security.py         # Authentication
│   │   └── middleware.py       # Custom middleware
│   ├── scrapers/
│   │   ├── __init__.py
│   │   ├── base_scraper.py     # Base scraper class
│   │   ├── news_scrapers/
│   │   │   ├── __init__.py
│   │   │   ├── detik_scraper.py
│   │   │   ├── kompas_scraper.py
│   │   │   ├── tempo_scraper.py
│   │   │   └── local_news_scrapers.py
│   │   ├── social_scrapers/
│   │   │   ├── __init__.py
│   │   │   ├── twitter_scraper.py
│   │   │   ├── facebook_scraper.py
│   │   │   ├── instagram_scraper.py
│   │   │   └── youtube_scraper.py
│   │   └── forum_scrapers/
│   │       ├── __init__.py
│   │       ├── kaskus_scraper.py
│   │       └── reddit_scraper.py
│   ├── processors/
│   │   ├── __init__.py
│   │   ├── sentiment_analyzer.py
│   │   ├── topic_extractor.py
│   │   ├── influencer_detector.py
│   │   └── data_cleaner.py
│   ├── models/
│   │   ├── __init__.py
│   │   ├── database_models.py  # MongoDB models
│   │   ├── api_models.py       # Pydantic models
│   │   └── ml_models.py        # AI model definitions
│   ├── services/
│   │   ├── __init__.py
│   │   ├── keyword_service.py
│   │   ├── sentiment_service.py
│   │   ├── report_service.py
│   │   └── notification_service.py
│   ├── tasks/
│   │   ├── __init__.py
│   │   ├── celery_app.py       # Celery configuration
│   │   ├── scraping_tasks.py   # Scheduled scraping
│   │   ├── processing_tasks.py # Data processing
│   │   └── notification_tasks.py
│   └── utils/
│       ├── __init__.py
│       ├── helpers.py
│       ├── validators.py
│       └── exceptions.py
├── tests/
│   ├── __init__.py
│   ├── test_api/
│   ├── test_scrapers/
│   └── test_processors/
├── docker/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── docker-compose.prod.yml
├── scripts/
│   ├── init_db.py
│   ├── seed_data.py
│   └── deploy.sh
├── requirements/
│   ├── base.txt
│   ├── dev.txt
│   └── prod.txt
├── .env.example
├── .gitignore
├── README.md
└── alembic.ini               # DB migrations
```

## 🗄️ Database Schema

### **MongoDB Collections**

#### **1. keywords**
```json
{
  "_id": "ObjectId",
  "keyword": "string",
  "category": "string",
  "active": "boolean",
  "created_at": "datetime",
  "updated_at": "datetime",
  "monitoring_start": "datetime",
  "priority": "integer"
}
```

#### **2. scraped_data**
```json
{
  "_id": "ObjectId",
  "source": "string",
  "platform": "string",
  "content": "string",
  "url": "string",
  "author": "string",
  "author_followers": "integer",
  "engagement": {
    "likes": "integer",
    "shares": "integer",
    "comments": "integer"
  },
  "keywords": ["string"],
  "raw_data": "object",
  "scraped_at": "datetime",
  "published_at": "datetime"
}
```

#### **3. sentiment_analysis**
```json
{
  "_id": "ObjectId",
  "data_id": "ObjectId",
  "sentiment": "string",
  "confidence": "float",
  "sentiment_scores": {
    "positive": "float",
    "negative": "float",
    "neutral": "float"
  },
  "emotion": "string",
  "keywords_mentioned": ["string"],
  "processed_at": "datetime",
  "model_version": "string"
}
```

#### **4. topics**
```json
{
  "_id": "ObjectId",
  "topic": "string",
  "keywords": ["string"],
  "mentions_count": "integer",
  "sentiment_distribution": {
    "positive": "integer",
    "negative": "integer", 
    "neutral": "integer"
  },
  "trending_score": "float",
  "first_mentioned": "datetime",
  "last_mentioned": "datetime",
  "related_data_ids": ["ObjectId"]
}
```

#### **5. influencers**
```json
{
  "_id": "ObjectId",
  "username": "string",
  "platform": "string",
  "followers_count": "integer",
  "engagement_rate": "float",
  "mentions_count": "integer",
  "sentiment_influence": "string",
  "topics_discussed": ["string"],
  "profile_url": "string",
  "last_activity": "datetime"
}
```

### **InfluxDB (Time-Series Data)**

#### **sentiment_metrics**
```
measurement: sentiment_metrics
tags:
  - keyword
  - platform
  - sentiment
fields:
  - count (integer)
  - volume (integer)
  - engagement_total (integer)
time: timestamp
```

#### **trending_metrics**
```
measurement: trending_metrics
tags:
  - topic
  - platform
fields:
  - mentions_count (integer)
  - trending_score (float)
  - sentiment_score (float)
time: timestamp
```

## 🔄 Core Services

### **1. Scraping Service**
```python
# app/services/scraping_service.py
from abc import ABC, abstractmethod
from typing import List, Dict, Any
import asyncio
from app.scrapers.base_scraper import BaseScraper

class ScrapingService:
    def __init__(self):
        self.scrapers = {
            'news': [DetikScraper(), KompasScraper(), TempoScraper()],
            'social': [TwitterScraper(), FacebookScraper()],
            'forums': [KaskusScraper()]
        }
    
    async def scrape_all_sources(self, keywords: List[str]) -> List[Dict]:
        """Scrape all configured sources for given keywords"""
        results = []
        for category, scrapers in self.scrapers.items():
            for scraper in scrapers:
                try:
                    data = await scraper.scrape(keywords)
                    results.extend(data)
                except Exception as e:
                    logger.error(f"Scraping failed for {scraper.__class__.__name__}: {e}")
        return results
    
    async def scrape_by_platform(self, platform: str, keywords: List[str]) -> List[Dict]:
        """Scrape specific platform"""
        pass
```

### **2. Sentiment Analysis Service**
```python
# app/services/sentiment_service.py
from transformers import pipeline
import spacy
from textblob import TextBlob

class SentimentAnalysisService:
    def __init__(self):
        # Load Indonesian language model
        self.nlp = spacy.load("id_core_news_sm")
        # Load BERT model for Indonesian sentiment
        self.sentiment_pipeline = pipeline(
            "sentiment-analysis",
            model="indobenchmark/indobert-base-p1",
            tokenizer="indobenchmark/indobert-base-p1"
        )
    
    def analyze_sentiment(self, text: str) -> Dict[str, Any]:
        """Analyze sentiment of given text"""
        # Clean text
        cleaned_text = self._clean_text(text)
        
        # BERT analysis
        bert_result = self.sentiment_pipeline(cleaned_text)[0]
        
        # TextBlob analysis (backup)
        blob = TextBlob(cleaned_text)
        
        return {
            "sentiment": bert_result["label"],
            "confidence": bert_result["score"],
            "sentiment_scores": {
                "positive": bert_result["score"] if bert_result["label"] == "POSITIVE" else 1 - bert_result["score"],
                "negative": bert_result["score"] if bert_result["label"] == "NEGATIVE" else 1 - bert_result["score"],
                "neutral": 0.5  # Calculate based on uncertainty
            },
            "polarity": blob.sentiment.polarity,
            "subjectivity": blob.sentiment.subjectivity
        }
    
    def batch_analyze(self, texts: List[str]) -> List[Dict]:
        """Analyze multiple texts efficiently"""
        return [self.analyze_sentiment(text) for text in texts]
```

### **3. Topic Extraction Service**
```python
# app/services/topic_service.py
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from collections import Counter
import re

class TopicExtractionService:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(
            max_features=1000,
            stop_words=self._load_indonesian_stopwords(),
            ngram_range=(1, 2)
        )
    
    def extract_trending_topics(self, texts: List[str], num_topics: int = 10) -> List[Dict]:
        """Extract trending topics from texts"""
        # Vectorize texts
        tfidf_matrix = self.vectorizer.fit_transform(texts)
        
        # Clustering
        kmeans = KMeans(n_clusters=num_topics, random_state=42)
        clusters = kmeans.fit_predict(tfidf_matrix)
        
        # Extract top words per cluster
        feature_names = self.vectorizer.get_feature_names_out()
        topics = []
        
        for i in range(num_topics):
            cluster_center = kmeans.cluster_centers_[i]
            top_indices = cluster_center.argsort()[-10:][::-1]
            top_words = [feature_names[idx] for idx in top_indices]
            
            topics.append({
                "topic_id": i,
                "keywords": top_words,
                "documents_count": sum(clusters == i),
                "strength": float(cluster_center.max())
            })
        
        return topics
    
    def extract_hashtags_keywords(self, texts: List[str]) -> Dict[str, int]:
        """Extract hashtags and keywords with frequency"""
        hashtags = []
        keywords = []
        
        for text in texts:
            # Extract hashtags
            hashtags.extend(re.findall(r'#\w+', text.lower()))
            # Extract keywords (simple approach)
            words = re.findall(r'\b\w{4,}\b', text.lower())
            keywords.extend(words)
        
        return {
            "hashtags": dict(Counter(hashtags).most_common(20)),
            "keywords": dict(Counter(keywords).most_common(50))
        }
```

## 🔌 API Endpoints

### **Base Configuration**
```python
# app/api/v1/api.py
from fastapi import APIRouter
from app.api.v1.endpoints import dashboard, keywords, sentiment, topics, influencers, reports, comparison

api_router = APIRouter()

api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
api_router.include_router(keywords.router, prefix="/keywords", tags=["keywords"])
api_router.include_router(sentiment.router, prefix="/sentiment", tags=["sentiment"])
api_router.include_router(topics.router, prefix="/topics", tags=["topics"])
api_router.include_router(influencers.router, prefix="/influencers", tags=["influencers"])
api_router.include_router(reports.router, prefix="/reports", tags=["reports"])
api_router.include_router(comparison.router, prefix="/comparison", tags=["comparison"])
```

### **Dashboard Endpoints**
```python
# app/api/v1/endpoints/dashboard.py
from fastapi import APIRouter, Depends, Query
from typing import Optional
from datetime import datetime, timedelta

router = APIRouter()

@router.get("/stats")
async def get_dashboard_stats(
    date_from: Optional[datetime] = Query(None),
    date_to: Optional[datetime] = Query(None),
    keywords: Optional[str] = Query(None)
):
    """Get dashboard overview statistics"""
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
        "trending_score": 78.5,
        "growth_rate": 12.3
    }

@router.get("/sentiment-trend")
async def get_sentiment_trend(
    period: str = Query("7d", regex="^(24h|7d|30d|90d)$"),
    keywords: Optional[str] = Query(None)
):
    """Get sentiment trend data for charts"""
    # Return time-series data for Chart.js
    pass

@router.get("/volume-trend") 
async def get_volume_trend(
    period: str = Query("7d"),
    platform: Optional[str] = Query(None)
):
    """Get mention volume trend"""
    pass
```

### **Keywords Management Endpoints**
```python
# app/api/v1/endpoints/keywords.py
from fastapi import APIRouter, Depends, HTTPException
from app.models.api_models import KeywordCreate, KeywordUpdate

router = APIRouter()

@router.get("/")
async def get_keywords():
    """Get all monitoring keywords"""
    pass

@router.post("/")
async def create_keyword(keyword: KeywordCreate):
    """Add new keyword for monitoring"""
    pass

@router.put("/{keyword_id}")
async def update_keyword(keyword_id: str, keyword: KeywordUpdate):
    """Update keyword settings"""
    pass

@router.delete("/{keyword_id}")
async def delete_keyword(keyword_id: str):
    """Remove keyword from monitoring"""
    pass

@router.post("/{keyword_id}/toggle")
async def toggle_keyword_monitoring(keyword_id: str):
    """Enable/disable keyword monitoring"""
    pass
```

### **Sentiment Analysis Endpoints**
```python
# app/api/v1/endpoints/sentiment.py
router = APIRouter()

@router.get("/analysis")
async def get_sentiment_analysis(
    keywords: Optional[str] = Query(None),
    platform: Optional[str] = Query(None),
    sentiment: Optional[str] = Query(None),
    date_from: Optional[datetime] = Query(None),
    date_to: Optional[datetime] = Query(None),
    limit: int = Query(50, le=100)
):
    """Get filtered sentiment analysis results"""
    pass

@router.get("/distribution")
async def get_sentiment_distribution(
    keywords: Optional[str] = Query(None),
    group_by: str = Query("platform", regex="^(platform|date|keyword)$")
):
    """Get sentiment distribution breakdown"""
    pass

@router.get("/mentions")
async def get_mentions(
    sentiment: Optional[str] = Query(None),
    platform: Optional[str] = Query(None),
    keywords: Optional[str] = Query(None),
    page: int = Query(1, ge=1),
    size: int = Query(20, le=100)
):
    """Get individual mentions with pagination"""
    pass
```

## ⚙️ Celery Tasks & Scheduling

### **Task Configuration**
```python
# app/tasks/celery_app.py
from celery import Celery
from celery.schedules import crontab
from app.config.settings import settings

celery_app = Celery(
    "pasip_ai",
    broker=settings.REDIS_URL,
    backend=settings.REDIS_URL,
    include=[
        "app.tasks.scraping_tasks",
        "app.tasks.processing_tasks", 
        "app.tasks.notification_tasks"
    ]
)

# Scheduling configuration
celery_app.conf.beat_schedule = {
    'scrape-news-hourly': {
        'task': 'app.tasks.scraping_tasks.scrape_news_sources',
        'schedule': crontab(minute=0),  # Every hour
    },
    'scrape-social-media': {
        'task': 'app.tasks.scraping_tasks.scrape_social_media',
        'schedule': crontab(minute='*/30'),  # Every 30 minutes
    },
    'process-sentiment-analysis': {
        'task': 'app.tasks.processing_tasks.process_sentiment_batch',
        'schedule': crontab(minute='*/15'),  # Every 15 minutes
    },
    'extract-trending-topics': {
        'task': 'app.tasks.processing_tasks.extract_trending_topics',
        'schedule': crontab(minute=0, hour='*/6'),  # Every 6 hours
    },
    'generate-daily-reports': {
        'task': 'app.tasks.notification_tasks.generate_daily_reports',
        'schedule': crontab(hour=7, minute=0),  # Every day at 7 AM
    },
    'cleanup-old-data': {
        'task': 'app.tasks.processing_tasks.cleanup_old_data',
        'schedule': crontab(hour=2, minute=0),  # Every day at 2 AM
    }
}

celery_app.conf.timezone = 'Asia/Jakarta'
```

### **Scraping Tasks**
```python
# app/tasks/scraping_tasks.py
from celery import current_task
from app.tasks.celery_app import celery_app
from app.services.scraping_service import ScrapingService
from app.services.keyword_service import KeywordService

@celery_app.task(bind=True)
def scrape_news_sources(self):
    """Scrape news websites for active keywords"""
    try:
        keyword_service = KeywordService()
        scraping_service = ScrapingService()
        
        active_keywords = keyword_service.get_active_keywords()
        
        if not active_keywords:
            return {"status": "no_keywords", "message": "No active keywords found"}
        
        results = scraping_service.scrape_news_sources(active_keywords)
        
        return {
            "status": "success",
            "scraped_count": len(results),
            "keywords": active_keywords
        }
    except Exception as exc:
        current_task.retry(countdown=300, max_retries=3, exc=exc)

@celery_app.task(bind=True)
def scrape_social_media(self):
    """Scrape social media platforms"""
    try:
        # Implementation for social media scraping
        pass
    except Exception as exc:
        current_task.retry(countdown=180, max_retries=5, exc=exc)

@celery_app.task
def scrape_specific_platform(platform: str, keywords: list):
    """Scrape specific platform on demand"""
    pass
```

### **Processing Tasks**
```python
# app/tasks/processing_tasks.py
@celery_app.task
def process_sentiment_batch():
    """Process sentiment analysis for unprocessed data"""
    try:
        # Get unprocessed scraped data
        # Run sentiment analysis
        # Save results to database
        pass
    except Exception as exc:
        logger.error(f"Sentiment processing failed: {exc}")

@celery_app.task
def extract_trending_topics():
    """Extract and update trending topics"""
    pass

@celery_app.task
def identify_influencers():
    """Identify and update influencer data"""
    pass

@celery_app.task
def cleanup_old_data():
    """Clean up old data beyond retention period"""
    pass
```

## 🚀 Deployment Configuration

### **Docker Configuration**
```dockerfile
# docker/Dockerfile
FROM python:3.9-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements/prod.txt .
RUN pip install --no-cache-dir -r prod.txt

# Download spaCy model
RUN python -m spacy download id_core_news_sm

# Copy application
COPY app/ ./app/
COPY alembic.ini .
COPY scripts/ ./scripts/

# Create non-root user
RUN adduser --disabled-password --gecos '' appuser
RUN chown -R appuser:appuser /app
USER appuser

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### **Docker Compose**
```yaml
# docker/docker-compose.yml
version: '3.8'

services:
  app:
    build: 
      context: ..
      dockerfile: docker/Dockerfile
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=mongodb://mongo:27017/pasip_ai
      - REDIS_URL=redis://redis:6379/0
      - INFLUXDB_URL=http://influxdb:8086
    depends_on:
      - mongo
      - redis
      - influxdb
    volumes:
      - ../app:/app/app
      - logs:/app/logs

  celery-worker:
    build:
      context: ..
      dockerfile: docker/Dockerfile
    command: celery -A app.tasks.celery_app worker --loglevel=info
    environment:
      - DATABASE_URL=mongodb://mongo:27017/pasip_ai
      - REDIS_URL=redis://redis:6379/0
    depends_on:
      - mongo
      - redis
    volumes:
      - ../app:/app/app

  celery-beat:
    build:
      context: ..
      dockerfile: docker/Dockerfile
    command: celery -A app.tasks.celery_app beat --loglevel=info
    environment:
      - DATABASE_URL=mongodb://mongo:27017/pasip_ai
      - REDIS_URL=redis://redis:6379/0
    depends_on:
      - mongo
      - redis
    volumes:
      - ../app:/app/app

  mongo:
    image: mongo:5.0
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
    environment:
      - MONGO_INITDB_DATABASE=pasip_ai

  redis:
    image: redis:6.2-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  influxdb:
    image: influxdb:2.0
    ports:
      - "8086:8086"
    volumes:
      - influxdb_data:/var/lib/influxdb2
    environment:
      - INFLUXDB_DB=pasip_ai
      - INFLUXDB_ADMIN_USER=admin
      - INFLUXDB_ADMIN_PASSWORD=adminpassword

volumes:
  mongo_data:
  redis_data:
  influxdb_data:
  logs:
```

## 🔧 Environment Configuration

### **Environment Variables**
```bash
# .env.example
# Database
DATABASE_URL=mongodb://localhost:27017/pasip_ai
REDIS_URL=redis://localhost:6379/0
INFLUXDB_URL=http://localhost:8086
INFLUXDB_TOKEN=your_influx_token
INFLUXDB_ORG=nasdem
INFLUXDB_BUCKET=pasip_ai

# API Keys
TWITTER_BEARER_TOKEN=your_twitter_bearer_token
FACEBOOK_ACCESS_TOKEN=your_facebook_token
INSTAGRAM_ACCESS_TOKEN=your_instagram_token
YOUTUBE_API_KEY=your_youtube_api_key
NEWS_API_KEY=your_news_api_key

# Security
SECRET_KEY=your_super_secret_key
ACCESS_TOKEN_EXPIRE_MINUTES=30
ALGORITHM=HS256

# Scraping Configuration
SCRAPING_DELAY=1
MAX_CONCURRENT_REQUESTS=10
USER_AGENT=PASIP-AI-Bot/1.0

# AI/ML
HUGGINGFACE_API_KEY=your_huggingface_key
OPENAI_API_KEY=your_openai_key

# Monitoring
SENTRY_DSN=your_sentry_dsn
LOG_LEVEL=INFO

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

## 📊 Monitoring & Logging

### **Logging Configuration**
```python
# app/core/logging.py
import logging
import sys
from loguru import logger
from app.config.settings import settings

# Remove default handler
logger.remove()

# Add custom handlers
logger.add(
    sys.stdout,
    format="<green>{time:YYYY-MM-DD HH:mm:ss}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - <level>{message}</level>",
    level=settings.LOG_LEVEL
)

logger.add(
    "logs/pasip_ai_{time:YYYY-MM-DD}.log",
    rotation="1 day",
    retention="30 days",
    format="{time:YYYY-MM-DD HH:mm:ss} | {level: <8} | {name}:{function}:{line} - {message}",
    level="INFO"
)

# Scraping specific logs
logger.add(
    "logs/scraping_{time:YYYY-MM-DD}.log",
    filter=lambda record: "scraping" in record["extra"],
    rotation="1 day",
    retention="7 days"
)
```

### **Health Check Endpoints**
```python
# app/api/v1/endpoints/health.py
from fastapi import APIRouter, Depends
from app.core.database import get_database

router = APIRouter()

@router.get("/health")
async def health_check():
    """Basic health check"""
    return {"status": "healthy", "timestamp": datetime.utcnow()}

@router.get("/health/detailed")
async def detailed_health_check(db=Depends(get_database)):
    """Detailed health check including services"""
    checks = {
        "api": "healthy",
        "database": "healthy",  # Check MongoDB connection
        "redis": "healthy",     # Check Redis connection
        "influxdb": "healthy",  # Check InfluxDB connection
        "celery": "healthy"     # Check Celery workers
    }
    
    # Perform actual checks
    # Return detailed status
    
    return {
        "status": "healthy" if all(v == "healthy" for v in checks.values()) else "unhealthy",
        "checks": checks,
        "timestamp": datetime.utcnow()
    }
```

## 🚀 Development & Deployment

### **Development Setup**
```bash
# Clone repository
git clone <repository_url>
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements/dev.txt

# Setup environment
cp .env.example .env
# Edit .env with your configurations

# Start services
docker-compose up -d mongo redis influxdb

# Run database migrations
python scripts/init_db.py

# Start development server
uvicorn app.main:app --reload

# Start Celery worker (in another terminal)
celery -A app.tasks.celery_app worker --loglevel=info

# Start Celery beat (in another terminal)
celery -A app.tasks.celery_app beat --loglevel=info
```

### **Production Deployment**
```bash
# Build and deploy with Docker
docker-compose -f docker/docker-compose.prod.yml up -d

# Or deploy to cloud (example with AWS)
# Use provided scripts/deploy.sh
```

## 📋 Testing Strategy

### **Test Configuration**
```python
# tests/conftest.py
import pytest
from fastapi.testclient import TestClient
from app.main import app

@pytest.fixture
def client():
    return TestClient(app)

@pytest.fixture
def test_db():
    # Setup test database
    pass

@pytest.fixture  
def sample_scraped_data():
    return [
        {
            "content": "Test content about politics",
            "source": "test_source",
            "platform": "twitter",
            "url": "https://test.com",
            "scraped_at": datetime.utcnow()
        }
    ]
```

### **API Tests**
```python
# tests/test_api/test_dashboard.py
def test_get_dashboard_stats(client):
    response = client.get("/api/v1/dashboard/stats")
    assert response.status_code == 200
    data = response.json()
    assert "total_mentions" in data
    assert "sentiment_distribution" in data

def test_get_sentiment_trend(client):
    response = client.get("/api/v1/dashboard/sentiment-trend?period=7d")
    assert response.status_code == 200
```

### **Scraper Tests**
```python
# tests/test_scrapers/test_news_scrapers.py
def test_detik_scraper():
    scraper = DetikScraper()
    results = scraper.scrape(["politik", "nasdem"])
    assert len(results) > 0
    assert all("content" in item for item in results)
```

## 🔄 CI/CD Pipeline

### **GitHub Actions**
```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      mongo:
        image: mongo:5.0
        ports:
          - 27017:27017
      redis:
        image: redis:6.2
        ports:
          - 6379:6379
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Set up Python
      uses: actions/setup-python@v2
      with:
        python-version: 3.9
    
    - name: Install dependencies
      run: |
        pip install -r requirements/dev.txt
    
    - name: Run tests
      run: |
        pytest tests/ -v --cov=app
    
    - name: Run linting
      run: |
        flake8 app/
        black --check app/
    
  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: Deploy to production
      run: |
        # Deployment steps
        echo "Deploying to production..."
```

---

## 📈 Performance Considerations

### **Optimization Strategies**
1. **Database Indexing**: Create indexes on frequently queried fields
2. **Caching**: Redis caching for frequent API calls
3. **Connection Pooling**: Efficient database connections
4. **Rate Limiting**: Prevent API abuse
5. **Async Processing**: Non-blocking operations
6. **Data Pagination**: Limit response sizes
7. **Background Jobs**: Move heavy processing to Celery tasks

### **Scaling Plan**
1. **Horizontal Scaling**: Multiple API instances
2. **Database Sharding**: Distribute data across databases
3. **Load Balancing**: Nginx/HAProxy for traffic distribution
4. **Microservices**: Split into smaller services
5. **CDN**: Cache static content
6. **Monitoring**: Comprehensive monitoring and alerting

---

*Backend architecture ini dirancang untuk scalable, maintainable, dan efficient dalam handling real-time data scraping dan analysis untuk Platform Analisis Sentimen & Isu Publik PASIP-AI.*