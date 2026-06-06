from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from sqlalchemy import text
from database.connection import engine
from voice_ai.call_flow import generate_response

router = APIRouter()


class VoiceMessageData(BaseModel):
    customer_name: str
    phone_number: str
    loan_id: int
    customer_message: str


class EndCallData(BaseModel):
    customer_name: str
    phone_number: str
    loan_id: int
    transcript: list


@router.post("/voice-message")
def voice_message(data: VoiceMessageData):

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

        if not customer:
            raise HTTPException(
                status_code=401,
                detail="Customer not found"
            )

        loan = connection.execute(
            text("""
                SELECT *
                FROM loans
                WHERE id = :loan_id
            """),
            {
                "loan_id": data.loan_id
            }
        ).fetchone()

        if not loan:
            raise HTTPException(
                status_code=401,
                detail="Loan not found"
            )

    prompt = f"""
    Customer Name: {data.customer_name}
    Phone Number: {data.phone_number}
    Loan ID: {data.loan_id}

    Customer says:
    {data.customer_message}

    You are a loan recovery agent.
    Remember the customer's name and loan details throughout the conversation.
    """

    ai_reply = generate_response(prompt)

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

        if not customer:
            raise HTTPException(
                status_code=401,
                detail="Customer not found"
            )

        loan = connection.execute(
            text("""
                SELECT *
                FROM loans
                WHERE id = :loan_id
            """),
            {
                "loan_id": data.loan_id
            }
        ).fetchone()

        if not loan:
            raise HTTPException(
                status_code=401,
                detail="Loan not found"
            )

        transcript_text = str(data.transcript)

        connection.execute(
            text("""
                INSERT INTO call_logs
                (
                    customer_name,
                    phone_number,
                    loan_id,
                    customer_message,
                    ai_reply,
                    call_status
                )
                VALUES
                (
                    :customer_name,
                    :phone_number,
                    :loan_id,
                    :customer_message,
                    :ai_reply,
                    :call_status
                )
            """),
            {
                "customer_name": data.customer_name,
                "phone_number": data.phone_number,
                "loan_id": data.loan_id,
                "customer_message": data.transcript[-1]["text"],
                "ai_reply": "Conversation saved",
                "call_status": "AI conversation completed and saved"
            }
        )

        connection.commit()

    return {
        "message": "Call saved successfully"
    }


@router.get("/call-logs")
def get_call_logs():

    with engine.connect() as connection:

        result = connection.execute(
            text("""
                SELECT *
                FROM call_logs
                ORDER BY id DESC
            """)
        )

        logs = []

        for row in result:
            logs.append(dict(row._mapping))

        return logs