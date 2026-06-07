from fastapi import FastAPI
from pydantic import BaseModel

from ai_engine.ai_service import process_customer_interaction


# Create FastAPI app
app = FastAPI()


# Request schema
class CustomerRequest(BaseModel):

    message: str


# API endpoint
@app.post("/analyze")
def analyze_customer(request: CustomerRequest):

    result = process_customer_interaction(request.message)

    return result