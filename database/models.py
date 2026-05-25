from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from database.db import Base


class Interaction(Base):
    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    user_text = Column(Text)
    ai_reply = Column(Text)
    timestamp = Column(DateTime, default=datetime.utcnow)


class CallLog(Base):
    __tablename__ = "call_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    user_text = Column(Text)
    ai_reply = Column(Text)
    status = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)