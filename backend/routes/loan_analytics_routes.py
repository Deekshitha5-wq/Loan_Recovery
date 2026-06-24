from fastapi import APIRouter
from database.connection import engine
from sqlalchemy import text

router = APIRouter()

@router.get("/loan-analytics")
def get_loan_analytics():

    with engine.connect() as connection:

        total_loans = connection.execute(
            text("SELECT COUNT(*) FROM loans")
        ).scalar()

        pending_loans = connection.execute(
            text("SELECT COUNT(*) FROM loans WHERE status='pending'")
        ).scalar()

        recovered_loans = connection.execute(
            text("SELECT COUNT(*) FROM loans WHERE status='paid'")
        ).scalar()

        recovery_rate = (
            round((recovered_loans / total_loans) * 100)
            if total_loans else 0
        )

        return {
            "totalLoans": total_loans,
            "pendingLoans": pending_loans,
            "recoveredLoans": recovered_loans,
            "recoveryRate": recovery_rate
        }