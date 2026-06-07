from fastapi import APIRouter, HTTPException
from sqlalchemy import text
from database.connection import engine

router = APIRouter()


@router.get("/loans")
def get_loans():
    with engine.connect() as connection:
        result = connection.execute(
            text("""
                SELECT 
                    id,
                    customer_name AS customer,
                    amount,
                    status
                FROM loans
                ORDER BY id
            """)
        )

        loans = []

        for row in result:
            loans.append(dict(row._mapping))

        return loans


@router.get("/loan/{loan_id}")
def get_loan(loan_id: int):
    with engine.connect() as connection:
        loan = connection.execute(
            text("""
                SELECT 
                    id,
                    customer_name AS customer,
                    amount,
                    status
                FROM loans
                WHERE id = :loan_id
            """),
            {"loan_id": loan_id}
        ).fetchone()

        if not loan:
            raise HTTPException(
                status_code=404,
                detail="Loan not found"
            )

        return dict(loan._mapping)