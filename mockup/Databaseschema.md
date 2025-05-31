-- Tables yang diperlukan
CREATE TABLE keywords (
    id INT PRIMARY KEY,
    keyword VARCHAR(255),
    category VARCHAR(100),
    active BOOLEAN
);

CREATE TABLE scraped_data (
    id INT PRIMARY KEY,
    source VARCHAR(100),
    content TEXT,
    url VARCHAR(500),
    sentiment_score FLOAT,
    created_at TIMESTAMP
);

CREATE TABLE sentiment_analysis (
    id INT PRIMARY KEY,
    data_id INT,
    sentiment VARCHAR(50),
    confidence FLOAT,
    processed_at TIMESTAMP
);