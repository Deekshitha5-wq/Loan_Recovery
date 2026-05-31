from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database.connection import engine
from sqlalchemy import text

router = APIRouter()


class QuickActionData(BaseModel):
    loan_id: str
    customer_name: str | None = None
    action_type: str
    note: str | None = None


@router.post("/quick-action")
def save_quick_action(data: QuickActionData):

    if not data.loan_id:
        raise HTTPException(status_code=400, detail="Loan ID is required")

    if data.action_type == "Add Notes" and not data.note:
        raise HTTPException(status_code=400, detail="Note is required")

    status_message = ""

    if data.action_type == "Send Reminder":
        status_message = "Reminder sent successfully"

    elif data.action_type == "Mark as Paid":
        status_message = "Loan marked as paid successfully"

    elif data.action_type == "Add Notes":
        status_message = "Note added successfully"

    elif data.action_type == "Generate Report":
        status_message = "Report generated successfully"

    else:
        status_message = "Action completed successfully"

    with engine.connect() as connection:
        loan = connection.execute(
            text("SELECT * FROM loans WHERE id = :loan_id"),
            {"loan_id": int(data.loan_id)}).fetchone()

        if not loan:
            raise HTTPException(
                status_code=404,
                detail="Loan ID not found"
            )
        connection.execute(
            text("""
                INSERT INTO quick_actions
                (loan_id, customer_name, action_type, note, status)
                VALUES (:loan_id, :customer_name, :action_type, :note, :status)
            """),
            {
                "loan_id": data.loan_id,
                "customer_name": data.customer_name,
                "action_type": data.action_type,
                "note": data.note,
                "status": status_message,
            }
        )
        connection.commit()

    return {
        "message": status_message
    }


@router.get("/quick-actions")
def get_quick_actions():
    with engine.connect() as connection:
        result = connection.execute(
            text("SELECT * FROM quick_actions ORDER BY created_at DESC")
        )

        actions = []

        for row in result:
            actions.append(dict(row._mapping))

        return actions