import requests
import json
from datetime import datetime
import pytz

def is_today(date_str):
    try:
        return datetime.strptime(date_str, "%d%m%y").date() == datetime.today().date()
    except:
        return False

def get_nested_value(data, dotted_key):
    keys = dotted_key.split(".")
    for key in keys:
        if isinstance(data, dict):
            data = data.get(key)
        else:
            return None
    return data

def requestWithValidation(functionName, method, url, request, expect=None):
    try:
        response = requests.request(method, url, json=request, headers={"Content-Type": "application/json"})
        json_response = response.json()
        errors = []
        success = []
        inner_response = None

        if 'response' in json_response:
            inner_response = json.loads(json_response['response'])

            if expect:
                if "header" in inner_response and "transactionDate" in inner_response["header"]:
                    thai_tz = pytz.timezone("Asia/Bangkok")
                    thai_time = datetime.now(thai_tz)
                    today_yy = thai_time.strftime("%y")
                    today_mmdd = thai_time.strftime("%m%d")
                    today_yymmdd = today_yy + today_mmdd
                    expect["header.transactionDate"] = int(today_yymmdd)

                for key, expected_value in expect.items():
                    actual_value = get_nested_value(inner_response, key)
                    if expected_value == "ANY_VALUE":
                        if actual_value is None:
                            errors.append(f"Expected {key} to exist, but it's missing or None")
                    elif expected_value != actual_value:
                        errors.append(f"Expect {key} to be {expected_value}, but got {actual_value}")
                    else:
                        success.append(f"Expect {key} to be {expected_value}")

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
            "error": errors if errors else None,
            "success": success if success else None
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
