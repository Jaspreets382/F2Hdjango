def is_valid_status_transition(old_status, new_status):
    allowed = {
        "PENDING": ["CONFIRMED", "CANCELLED"],
        "CONFIRMED": ["DELIVERED", "CANCELLED"],
        "DELIVERED": [],
        "CANCELLED": [],
    }
    return new_status in allowed.get(old_status, [])
