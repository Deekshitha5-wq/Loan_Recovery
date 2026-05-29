from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from sqlalchemy import text
from database.connection import engine
from services.twilio_service import start_real_call

router = APIRouter()


class VoiceMessageData(BaseModel):
    customer_message: str


class EndCallData(BaseModel):
    customer_name: str
    phone_number: str
    loan_id: str
    transcript: list


def generate_ai_reply(message: str):
    msg = message.lower()

    if "paid" in msg or "already paid" in msg:
        return "Thank you. We will verify your payment and update your loan status shortly."

    if "tomorrow" in msg or "week" in msg or "later" in msg:
        return "I understand. Please confirm the exact date when you can make the payment."

    if "problem" in msg or "job" in msg or "issue" in msg:
        return "I understand your situation. I will mark this for follow-up by our recovery team."

    return "This is regarding your pending loan payment. Could you please confirm when you can make the payment?"


@router.post("/voice-message")
def voice_message(data: VoiceMessageData):
    ai_reply = generate_ai_reply(data.customer_message)

    return {
        "ai_reply": ai_reply
    }


@router.post("/end-call")
def end_call(data: EndCallData):
    call_sid = start_real_call(data.phone_number)
    with engine.connect() as connection:
        customer = connection.execute(
            text("""
                SELECT * FROM customers
                WHERE LOWER(name) = LOWER(:customer_name)
                AND phone = :phone_number
            """),
            {
                "customer_name": data.customer_name,
                "phone_number": data.phone_number
            }
        ).fetchone()

        if not customer:
            raise HTTPException(
                status_code=404,
                detail="Customer name and phone number do not match our records"
            )

        loan = connection.execute(
            text("""
                SELECT * FROM loans
                WHERE id = :loan_id
            """),
            {
                "loan_id": int(data.loan_id)
            }
        ).fetchone()

        if not loan:
            raise HTTPException(
                status_code=404,
                detail="Loan ID not found"
            )

        transcript_text = str(data.transcript)

        connection.execute(
            text("""
                INSERT INTO call_logs
                (customer_name, phone_number, loan_id, customer_message, ai_reply, call_status)
                VALUES (:customer_name, :phone_number, :loan_id, :customer_message, :ai_reply, :call_status)
            """),
            {
                "customer_name": data.customer_name,
                "phone_number": data.phone_number,
                "loan_id": data.loan_id,
                "customer_message": transcript_text,
                "ai_reply": "Full AI call transcript saved",
                "call_status": "Call completed and saved"
            }
        )

        connection.commit()

    return {
    "message": "Call ended and saved successfully",
    "twilio_call_sid": call_sid
}


@router.get("/call-logs")
def get_call_logs():
    with engine.connect() as connection:
        result = connection.execute(
            text("SELECT * FROM call_logs ORDER BY created_at DESC")
        )

        logs = []
        for row in result:
            logs.append(dict(row._mapping))

        return logs