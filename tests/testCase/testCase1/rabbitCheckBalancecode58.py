import json
from tests.common.request import requestWithValidation


def rabbit_check_balance():
    url = "http://localhost:9092/createRequest"
    data = {
    "CATEGORY": "com.pax.payment.RabbitCheckBalance",
        "parm": {
            "header": 
            {
                "formatVersion": "1",
                "endPointNamespace": "com.pax.edc.bpsp"
            },
            "detail":
            {
                "amountValue": 15.00
            }
        }
    }

    response = requestWithValidation("Create Sale", "post", url, data, {
        "formatVersion": "1",
        "amountValue": 15.00
    })
    print(json.dumps([response]))
