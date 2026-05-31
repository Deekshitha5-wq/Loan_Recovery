from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from sqlalchemy import text
from database.connection import engine
from services.twilio_service import start_real_call
from voice_ai.call_flow import generate_response

router = APIRouter()


class VoiceMessageData(BaseModel):
    customer_message: str


class EndCallData(BaseModel):
    customer_name: str
    phone_number: str
    loan_id: int
    transcript: list


def generate_ai_reply(message: str):
    msg = message.lower()

    if "paid" in msg:
        return "Thank you. We will verify your payment and update your loan status shortly."

    if "tomorrow" in msg or "later" in msg or "week" in msg:
        return "I understand. Please confirm the exact date you can make the payment."

    if "problem" in msg or "issue" in msg or "job" in msg:
        return "I understand your situation. I will mark this for recovery team follow-up."

    return "This is regarding your pending loan payment. Could you please confirm when you can pay?"


@router.post("/voice-message")
def voice_message(data: VoiceMessageData):
    ai_reply = generate_response(data.customer_message)

    return {
        "ai_reply": ai_reply
    }


@router.post("/end-call")
def end_call(data: EndCallData):

    if not data.transcript:
        raise HTTPException(
            status_code=400,
            detail="No conversation found to save"
        )

    with engine.connect() as connection:

        customer = connection.execute(
            text("""
                SELECT *
                FROM customers
                WHERE name = :customer_name
                AND phone = :phone_number
            """),
            {
                "customer_name": data.customer_name,
                "phone_number": data.phone_number
            }
        ).fetchone()
        print("Customer Found:", customer)

        if not customer:
            raise HTTPException(
                status_code=401,
                detail="Authentication failed: customer name and phone number do not match database records"
            )

        loan = connection.execute(
            text("""
                SELECT *
                FROM loans
                WHERE id = :loan_id
                AND customer_name = :customer_name
            """),
            {
                "loan_id": data.loan_id,
                "customer_name": data.customer_name
            }
        ).fetchone()
        print("Loan Found:", loan)

        if not loan:
            raise HTTPException(
                status_code=401,
                detail="Authentication failed: loan ID does not match this customer"
            )

        twilio_sid = start_real_call(data.phone_number)

        transcript_text = str(data.transcript)

        connection.execute(
            text("""
                INSERT INTO call_logs
                (
                    customer_name,
                    phone_number,
                    loan_id,
                    transcript,
                    call_status,
                    twilio_call_sid
                )
                VALUES
                (
                    :customer_name,
                    :phone_number,
                    :loan_id,
                    :transcript,
                    :call_status,
                    :twilio_call_sid
                )
            """),
            {
                "customer_name": data.customer_name,
                "phone_number": data.phone_number,
                "loan_id": data.loan_id,
                "transcript": transcript_text,
                "call_status": "Call completed and saved",
                "twilio_call_sid": twilio_sid
            }
        )

        connection.commit()

    return {
        "message": "Call authenticated, Twilio call started, and history saved",
        "twilio_call_sid": twilio_sid
    }


@router.get("/call-logs")
def get_call_logs():

    with engine.connect() as connection:
        result = connection.execute(
            text("""
                SELECT *
                FROM call_logs
                ORDER BY call_started_at DESC
            """)
        )

        logs = []

        for row in result:
            logs.append(dict(row._mapping))

        return logs