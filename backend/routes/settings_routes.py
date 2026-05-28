from fastapi import APIRouter

router = APIRouter()


@router.get("/settings")
def get_settings():

    return {
        "dark_mode": "ON",
        "notifications": "Enabled",
        "language": "English"
    }