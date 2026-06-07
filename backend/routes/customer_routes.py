from fastapi import APIRouter
from sqlalchemy import text
from database.connection import engine

router = APIRouter()


@router.get("/customers")
def get_customers():
    with engine.connect() as connection:
        result = connection.execute(
            text("""
                SELECT id, name, phone, status
                FROM customers
                ORDER BY id
            """)
        )

        customers = []

        for row in result:
            customers.append(dict(row._mapping))

        return customers