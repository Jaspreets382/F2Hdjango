ROLE_BASED_TRANSITIONS = {
    "buyer": {
        "PENDING": ["CANCELLED"],
        "CONFIRMED": ["CANCELLED"],
    },
    "farmer": {
        "PENDING": ["CONFIRMED","CANCELLED"],
        "CONFIRMED": ["DELIVERED"],
    }
}

FINAL_STATES = ["DELIVERED", "CANCELLED"]


def is_valid_transition(role, old_status, new_status):
    if old_status in FINAL_STATES:
        return False

    return new_status in ROLE_BASED_TRANSITIONS.get(role, {}).get(old_status, [])
