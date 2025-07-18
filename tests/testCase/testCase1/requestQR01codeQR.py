import json
from tests.common.request import requestWithValidation


def request_qr01():
    url = "http://localhost:9092/createRequest"
    data = {
    "CATEGORY": "com.pax.payment.RequestQR",
        "parm": {
            "header": 
            {
                "formatVersion": "1",
                "endPointNamespace": "com.pax.edc.bpsp"
            },
            "detail":
            {
                "amountValue": 15.00,
                "QRType": "01"
            }
        }
    }

    response = requestWithValidation("Create Sale", "post", url, data, {
        "formatVersion": "1",
        "QRType": "01"
    })
    print(json.dumps([response]))