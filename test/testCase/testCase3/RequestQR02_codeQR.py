import json
from test.common.request import requestWithValidation


def request_qr02():
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
                "amountValue": 12345678.00,
                "QRType": "01"
            }
        }
    }

    response = requestWithValidation("Create Sale", "post", url, data, {
        "formatVersion": "1",
        "QRType": "02"
    })
    print(json.dumps([response]))
