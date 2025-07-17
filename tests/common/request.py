import requests
import json

def requestWithValidation(functionName, method, url, request, expect=None):
    try:
        response = requests.request(method, url, json=request, headers={"Content-Type": "application/json"})
        json_response = response.json()
        errors = []
        inner_response = None

        if 'response' in json_response:
            inner_response = json.loads(json_response['response'])

            if expect:  # Only run validation if `expect` is provided and not None
                for key, expected_value in expect.items():
                    actual_value = inner_response.get(key)
                    if expected_value == "ANY_VALUE":
                        if actual_value is None:
                            errors.append(f"Expected {key} to exist, but it's missing or None")
                    elif expected_value != actual_value:
                        errors.append(f"Expect {key} to be {expected_value}, but got {actual_value}")
        else:
            errors.append(f"No response from device")

        return {
            "function": functionName,
            "request": request,
            "response": {
                "code": json_response.get("resultCode"),
                "body": inner_response,
                "message": json_response.get("message")
            },
            "error": errors if errors else None
        }

    except Exception as e:
        return {
            "function": functionName,
            "request": request,
            "response": {
                "code": None,
                "body": None,
                "message": str(e)
            },
            "error": [str(e)]
        }
