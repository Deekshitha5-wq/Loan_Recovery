from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
from database.connection import engine
from sqlalchemy import text
from reportlab.pdfgen import canvas
from datetime import datetime

router = APIRouter()


class QuickActionData(BaseModel):
    loan_id: str
    customer_name: str | None = None
    action_type: str
    note: str | None = None


def generate_report_pdf(loan):

    filename = f"loan_report_{loan.id}.pdf"

    c = canvas.Canvas(filename)

    c.setFont("Helvetica-Bold", 18)
    c.drawString(100, 800, "Loan Recovery Report")

    c.setFont("Helvetica", 12)

    c.drawString(100, 750, f"Customer Name: {loan.customer_name}")
    c.drawString(100, 720, f"Loan ID: {loan.id}")
    c.drawString(100, 690, f"Loan Amount: ₹{loan.amount}")
    c.drawString(100, 660, f"Current Status: {loan.status}")

    c.drawString(
        100,
        620,
        f"Generated On: {datetime.now().strftime('%d-%m-%Y %H:%M')}"
    )

    c.save()

    return filename


@router.get("/generate-report/{loan_id}")
def download_report(loan_id: int):

    with engine.connect() as connection:
        loan = connection.execute(
            text(
                "SELECT * FROM loans WHERE id = :loan_id"
            ),
            {"loan_id": loan_id}
        ).fetchone()

    if not loan:
        raise HTTPException(
            status_code=404,
            detail="Loan not found"
        )

    pdf_file = generate_report_pdf(loan)

    return FileResponse(
        pdf_file,
        media_type="application/pdf",
        filename=pdf_file
    )


@router.post("/quick-action")
def save_quick_action(data: QuickActionData):

    if not data.loan_id:
        raise HTTPException(
            status_code=400,
            detail="Loan ID is required"
        )

    if data.action_type == "Add Notes" and not data.note:
        raise HTTPException(
            status_code=400,
            detail="Note is required"
        )

    with engine.connect() as connection:

        loan = connection.execute(
            text(
                "SELECT * FROM loans WHERE id = :loan_id"
            ),
            {"loan_id": int(data.loan_id)}
        ).fetchone()

        if not loan:
            raise HTTPException(
                status_code=404,
                detail="Loan ID not found"
            )

        if data.action_type == "Send Reminder":
            status_message = (
                f"Reminder sent for Loan ID {data.loan_id}"
            )

        elif data.action_type == "Mark as Paid":

            connection.execute(
                text("""
                    UPDATE loans
                    SET status = 'paid'
                    WHERE id = :loan_id
                """),
                {"loan_id": int(data.loan_id)}
            )

            status_message = (
                f"Loan ID {data.loan_id} marked as paid"
            )

        elif data.action_type == "Add Notes":
            status_message = (
                f"Note added for Loan ID {data.loan_id}"
            )

        elif data.action_type == "Generate Report":
            status_message = (
                f"Report generated for Loan ID {data.loan_id}"
            )

        else:
            status_message = (
                "Action completed successfully"
            )

        connection.execute(
            text("""
                INSERT INTO quick_actions
                (
                    loan_id,
                    customer_name,
                    action_type,
                    note,
                    status
                )
                VALUES
                (
                    :loan_id,
                    :customer_name,
                    :action_type,
                    :note,
                    :status
                )
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
            text(
                "SELECT * FROM quick_actions ORDER BY created_at DESC"
            )
        )

        actions = []

        for row in result:
            actions.append(
                dict(row._mapping)
            )

        return actions