-- Create Isolated Schemas
CREATE SCHEMA IF NOT EXISTS customer1;
CREATE SCHEMA IF NOT EXISTS customer2;

-- Schema 1 Structure
CREATE TABLE IF NOT EXISTS customer1.customers (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT,
    phone TEXT,
    city TEXT,
    country TEXT
);

-- Schema 2 Structure
CREATE TABLE IF NOT EXISTS customer2.customers (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT,
    phone TEXT,
    city TEXT,
    country TEXT
);

-- Seed Schema 1 Data
INSERT INTO customer1.customers (name, email, phone, city, country) VALUES
('Aarav Kumar', 'aarav.kumar@example.com', '+971501112233', 'Dubai', 'UAE'),
('Riya Sharma', 'riya.sharma@example.com', '+971502223344', 'Abu Dhabi', 'UAE'),
('Karan Patel', 'karan.patel@example.com', '+971503334455', 'Sharjah', 'UAE'),
('Sneha Reddy', 'sneha.reddy@example.com', '+971504445566', 'Hyderabad', 'India'),
('Vikram Singh', 'vikram.singh@example.com', '+971505556677', 'Delhi', 'India'),
('Meera Joshi', 'meera.joshi@example.com', '+971506667788', 'Mumbai', 'India'),
('Arjun Verma', 'arjun.verma@example.com', '+971507778899', 'Dubai', 'UAE'),
('Pooja Nair', 'pooja.nair@example.com', '+971508889900', 'Kochi', 'India'),
('Rahul Mehta', 'rahul.mehta@example.com', '+971509990011', 'Pune', 'India'),
('Divya Kapoor', 'divya.kapoor@example.com', '+971501234567', 'Bangalore', 'India');

-- Seed Schema 2 Data
INSERT INTO customer2.customers (name, email, phone, city, country) VALUES
('Sameer Khan', 'sameer.khan@example.com', '+971501778899', 'Dubai', 'UAE'),
('Anita Desai', 'anita.desai@example.com', '+971502889900', 'Abu Dhabi', 'UAE'),
('Farhan Ali', 'farhan.ali@example.com', '+971503990011', 'Sharjah', 'UAE'),
('Lakshmi Menon', 'lakshmi.menon@example.com', '+971504110022', 'Chennai', 'India'),
('Suresh Babu', 'suresh.babu@example.com', '+971505220033', 'Hyderabad', 'India'),
('Nisha Kulkarni', 'nisha.kulkarni@example.com', '+971506330044', 'Pune', 'India'),
('Imran Sheikh', 'imran.sheikh@example.com', '+971507440055', 'Dubai', 'UAE'),
('Harini Iyer', 'harini.iyer@example.com', '+971508550066', 'Bangalore', 'India'),
('Rohit Chawla', 'rohit.chawla@example.com', '+971509660077', 'Delhi', 'India'),
('Aditi Rao', 'aditi.rao@example.com', '+971501770088', 'Mumbai', 'India');
