from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.auth_routes import router as auth_router
from routes.loan_routes import router as loan_router
from routes.customer_routes import router as customer_router
from routes.analytics_routes import router as analytics_router
from routes.notification_routes import router as notification_router
from routes.voice_routes import router as voice_router
from routes.settings_routes import router as settings_router
from routes.action_routes import router as action_router
from routes.call_analytics_routes import router as call_analytics_router
from routes.loan_analytics_routes import router as loan_analytics_router


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(loan_router)
app.include_router(customer_router)
app.include_router(analytics_router)
app.include_router(notification_router)
app.include_router(voice_router)
app.include_router(settings_router)
app.include_router(action_router)
app.include_router(call_analytics_router)
app.include_router(loan_analytics_router)

@app.get("/")
def home():
    return {"message": "Loan Recovery Backend Running"}