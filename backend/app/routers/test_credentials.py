from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)

# Frontend makes modifications to user_id 0 only, we can safely use user 1 for testing
def test_get_user_credentials():
    response = client.get("/users/1/credentials")
    assert response.status_code == 200
    assert response.json() == {
        "credentials": [
            {
                "id": "21418989-adf3-4ffa-822d-7044bf194d56",
                "issuer_id": 1,
                "name": "Driver's Liscence",
                "description": "",
                "payload": {
                    "id": "1236345",
                    "expiry": "2025-07-13T10:45:05Z"
                },
                "signature": "nROvOF/bvKRwtWDZE5tEP9pizAlWstAUOqYB+vsb6sx6JO6wHBvlH3pWNCt8d/t+Um9ZIlUljvnuVJKAcN/yCL947eDULfftxPR9VTLR+BZ3wszOpE8lsvbeM+WE6bLLv8hcKswX4O2ll7oU+7s58n0ACeWB3MofJNU+NWFC49j2ktl1p2QOZb2yA4slA8hL2uNBU7Sff0FRWZ4hVdBewl/+9TJhRlx62H96od9BgxKrrpo1MSCosqrjCenVRSFmxamdUWnHRllJ1Rdqcw9LswllhIJmsHnfnr6WEY1jaVbrAzxlNnz7Ii2cd6gkvIAQwMHDPQ+Zt4lhks3af/I+pA==",
                "created_date": "2025-07-13 22:22:47.141899+00:00"
            }
        ]
    }

def test_get_user_credential():
    response = client.get("/users/1/credentials/21418989-adf3-4ffa-822d-7044bf194d56")
    assert response.status_code == 200
    assert response.json() == {
        "credential":{
            "id": "21418989-adf3-4ffa-822d-7044bf194d56",
            "issuer_id": 1,
            "name": "Driver's Liscence",
            "description": "",
            "payload": {
                "id": "1236345",
                "expiry": "2025-07-13T10:45:05Z"
            },
            "signature": "nROvOF/bvKRwtWDZE5tEP9pizAlWstAUOqYB+vsb6sx6JO6wHBvlH3pWNCt8d/t+Um9ZIlUljvnuVJKAcN/yCL947eDULfftxPR9VTLR+BZ3wszOpE8lsvbeM+WE6bLLv8hcKswX4O2ll7oU+7s58n0ACeWB3MofJNU+NWFC49j2ktl1p2QOZb2yA4slA8hL2uNBU7Sff0FRWZ4hVdBewl/+9TJhRlx62H96od9BgxKrrpo1MSCosqrjCenVRSFmxamdUWnHRllJ1Rdqcw9LswllhIJmsHnfnr6WEY1jaVbrAzxlNnz7Ii2cd6gkvIAQwMHDPQ+Zt4lhks3af/I+pA==",
            "created_date": "2025-07-13 22:22:47.141899+00:00"
        }
    }

def test_verify_credential():
    credential_to_verify = {
        "id": "21418989-adf3-4ffa-822d-7044bf194d56",
        "issuer_id": 1,
        "name": "Driver's Liscence",
        "description": "",
        "payload": {
            "id": "1236345",
            "expiry": "2025-07-13T10:45:05Z"
        },
        "signature": "nROvOF/bvKRwtWDZE5tEP9pizAlWstAUOqYB+vsb6sx6JO6wHBvlH3pWNCt8d/t+Um9ZIlUljvnuVJKAcN/yCL947eDULfftxPR9VTLR+BZ3wszOpE8lsvbeM+WE6bLLv8hcKswX4O2ll7oU+7s58n0ACeWB3MofJNU+NWFC49j2ktl1p2QOZb2yA4slA8hL2uNBU7Sff0FRWZ4hVdBewl/+9TJhRlx62H96od9BgxKrrpo1MSCosqrjCenVRSFmxamdUWnHRllJ1Rdqcw9LswllhIJmsHnfnr6WEY1jaVbrAzxlNnz7Ii2cd6gkvIAQwMHDPQ+Zt4lhks3af/I+pA==",
        "created_date": "2025-07-13 22:22:47.141899+00:00"
    }

    response = client.post("users/1/credentials/verify", json=credential_to_verify)


    assert response.status_code == 200
    assert response.json() == {
        "is_valid": True,
        "error": None
    }