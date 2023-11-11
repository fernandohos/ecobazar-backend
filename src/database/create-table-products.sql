CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    sku VARCHAR(50),
    price NUMERIC(10, 2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    tags TEXT[] NOT NULL,
    stock INTEGER,
    weight NUMERIC(10, 2),
    color VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL,
    unit_type VARCHAR(10)
);
