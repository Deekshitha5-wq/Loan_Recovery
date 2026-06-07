from fastapi import APIRouter

from .auth_routes import router as auth_router
from .analytics_routes import router as analytics_router
from .customer_routes import router as customer_router
from .loan_routes import router as loan_router
from .notification_routes import router as notification_router
from .settings_routes import router as settings_router
from .voice_routes import router as voice_router

router = APIRouter()

router.include_router(auth_router)
router.include_router(analytics_router)
router.include_router(customer_router)
router.include_router(loan_router)
router.include_router(notification_router)
router.include_router(settings_router)
router.include_router(voice_router)