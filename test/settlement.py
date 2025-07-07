from test.common.request import requestWithValidation
import json

def test_create_settlement_request():
    url = "http://localhost:9092/createRequest"
    data = {
        "CATEGORY": "com.pax.payment.Settlement",
        "parm": {
            "isAllAcquirer": True,
            "acquirerNameList": ["acquirer0"]
        }
    }

    response = requestWithValidation("Create Settlement", "post", url, data)
    print(json.dumps([response]))

