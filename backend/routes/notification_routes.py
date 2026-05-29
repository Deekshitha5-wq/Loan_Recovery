from fastapi import APIRouter

router = APIRouter()


@router.get("/notifications")
def get_notifications():

    return [
        {
            "id": 1,
            "message": "EMI reminder sent successfully"
        },
        {
            "id": 2,
            "message": "Recovery target achieved"
        }
    ]