from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

quick_actions = []


class ActionData(BaseModel):
    action: str
    loan_id: str | None = None
    note: str | None = None


@router.post("/quick-action")
def save_quick_action(data: ActionData):
    quick_actions.append(data.dict())

    return {
        "message": f"{data.action} saved successfully",
        "data": data
    }


@router.get("/quick-actions")
def get_quick_actions():
    return quick_actions