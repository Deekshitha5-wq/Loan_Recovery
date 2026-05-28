from fastapi import APIRouter

router = APIRouter()


@router.get("/analytics")
def get_analytics():

    return {
        "total_loans": 1250,
        "pending_loans": 320,
        "recovered_loans": 930,
        "recovery_rate": "74%"
    }