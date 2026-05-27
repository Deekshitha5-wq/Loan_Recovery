from ai_engine.response_formatter import generate_complete_analysis
from ai_engine.analytics_engine import get_analytics


# Simulate interactions
generate_complete_analysis("I will pay tomorrow")

generate_complete_analysis("Call me later")

generate_complete_analysis("I cannot pay now")


# Print analytics
print("\n========== ANALYTICS SUMMARY ==========\n")

print(get_analytics())