from sqlalchemy import create_engine

DATABASE_URL = "postgresql://postgres:1234@localhost:5432/loan_ai"

engine = create_engine(DATABASE_URL)
connection = engine.connect()

print("Database Connected")