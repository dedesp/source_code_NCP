from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import routers
from app.api.v1.endpoints import dashboard
from app.api.v1.endpoints import topics  # Import baru

app = FastAPI(
    title="PASIP-AI Backend",
    description="Backend API untuk Political Aspirations and Sentiment Intelligence Platform", 
    version="1.0.0"
)

# CORS configuration untuk frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:3000", 
        "http://localhost:8080",
        "http://localhost:5173",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(
    dashboard.router,
    prefix="/api/v1/dashboard",
    tags=["dashboard"]
)

# Include topics router
app.include_router(
    topics.router,
    prefix="/api/v1/topics",
    tags=["topics"]
)

@app.get("/")
def root():
    return {
        "message": "PASIP-AI Backend is Running!",
        "docs": "/docs", 
        "status": "healthy"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "pasip-ai-backend"}
