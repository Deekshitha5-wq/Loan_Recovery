from pydantic import BaseModel
from typing import Optional


class StartAgentRequest(BaseModel):
    user_id: int
    phone_number: str


class ProcessInputRequest(BaseModel):
    user_id: int
    message: str


class GenerateResponseRequest(BaseModel):
    user_id: int
    message: str


class LogRequest(BaseModel):
    user_id: int
    user_text: str
    ai_reply: str
    status: Optional[str] = "in_progress"