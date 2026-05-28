CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    phone VARCHAR(20),
    status VARCHAR(50)
);

CREATE TABLE loans (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255),
    amount INTEGER,
    status VARCHAR(50)
);