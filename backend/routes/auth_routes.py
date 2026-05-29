from fastapi import APIRouter, HTTPException

router = APIRouter()

users = [
    {
        "email": "agent1@gmail.com",
        "password": "password123"
    }
]

@router.post("/login")
def login(data: dict):

    email = data.get("email")
    password = data.get("password")

    for user in users:
        if user["email"] == email and user["password"] == password:
            return {"message": "Login successful"}

    raise HTTPException(
        status_code=401,
        detail="Invalid email or password"
    )