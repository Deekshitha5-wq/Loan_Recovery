from fastapi import APIRouter
from database.connection import engine
from sqlalchemy import text

router = APIRouter()


@router.get("/notifications")
def get_notifications():

    with engine.connect() as connection:

        result = connection.execute(
            text("""
                SELECT
                    id,
                    action_type,
                    loan_id,
                    status,
                    created_at
                FROM quick_actions
                ORDER BY created_at DESC
                LIMIT 20
            """)
        )

        notifications = []

        for row in result:
            notifications.append({
                "id": row.id,
                "message": f"Loan {row.loan_id} - {row.status}",
                "action_type": row.action_type,
                "created_at": str(row.created_at)
            })

        return notifications