from sqlalchemy import create_engine

DATABASE_URL = "postgresql://postgres:password@localhost/loan_ai"

engine = create_engine(DATABASE_URL)
connection = engine.connect()

print("Database Connected")