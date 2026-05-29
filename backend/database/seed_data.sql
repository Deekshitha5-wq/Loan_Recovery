INSERT INTO users (email, password)
VALUES
('agent1@gmail.com', 'password123'),
('agent2@gmail.com', 'password456');

INSERT INTO customers (name, phone, status)
VALUES
('Rahul Sharma', '9876543210', 'Pending'),
('Priya Verma', '9876501234', 'Paid');

INSERT INTO loans (customer_name, amount, status)
VALUES
('Rahul Sharma', 250000, 'Pending'),
('Priya Verma', 400000, 'Paid');