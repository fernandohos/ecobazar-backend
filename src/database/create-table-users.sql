CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    street_address VARCHAR(100),
    country VARCHAR(50),
    state VARCHAR(50),
    zip_code VARCHAR(20),
    phone VARCHAR(20),
    avatar_url VARCHAR(200),
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);