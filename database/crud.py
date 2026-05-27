from database.db import SessionLocal
from database.models import Interaction, CallLog


def create_interaction(user_id, user_text, ai_reply):
    db = SessionLocal()
    interaction = Interaction(
        user_id=user_id,
        user_text=user_text,
        ai_reply=ai_reply
    )
    db.add(interaction)
    db.commit()
    db.refresh(interaction)
    db.close()
    return interaction


def get_interactions():
    db = SessionLocal()
    interactions = db.query(Interaction).all()
    db.close()
    return interactions


def create_log(user_id, user_text, ai_reply, status):
    db = SessionLocal()
    log = CallLog(
        user_id=user_id,
        user_text=user_text,
        ai_reply=ai_reply,
        status=status
    )
    db.add(log)
    db.commit()
    db.refresh(log)
    db.close()
    return log


def get_logs():
    db = SessionLocal()
    logs = db.query(CallLog).all()
    db.close()
    return logs