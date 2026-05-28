from fastapi import APIRouter

router = APIRouter()


@router.get("/customers")
def get_customers():

    return [
        {
            "id": 1,
            "name": "Rahul Sharma",
            "phone": "9876543210",
            "status": "Pending"
        },
        {
            "id": 2,
            "name": "Priya Verma",
            "phone": "9876501234",
            "status": "Paid"
        }
    ]