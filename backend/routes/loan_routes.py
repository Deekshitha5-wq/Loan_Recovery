from fastapi import APIRouter, HTTPException

router = APIRouter()

loans = [
    {
        "id": 1,
        "customer": "Rahul Sharma",
        "amount": 500000,
        "status": "Pending"
    },
    {
        "id": 2,
        "customer": "Priya Verma",
        "amount": 300000,
        "status": "Paid"
    },
    {
        "id": 3,
        "customer": "Arjun Rao",
        "amount": 700000,
        "status": "Overdue"
    }
]
@router.get("/loans")
def get_loans():
    return loans

@router.get("/loan/{loan_id}")
def get_loan(loan_id: int):

    for loan in loans:
        if loan["id"] == loan_id:
            return loan

    raise HTTPException(
        status_code=404,
        detail="Loan not found"
    )