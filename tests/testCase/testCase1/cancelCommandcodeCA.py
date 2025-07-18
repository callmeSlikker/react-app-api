import json
from tests.common.request import requestWithValidation


def inquiry_qr():
    url = "http://localhost:9092/createRequest"
    data = {
    "CATEGORY": "com.pax.payment.CancelCommand",
        "parm": {
            "header": 
            {
                "formatVersion": "1",
                "endPointNamespace": "com.pax.edc.bpsp"
            },
            "detail":
            {
                "QRType": "12",
                "trace": "000001"
            }
        }
    }

    response = requestWithValidation("Create Sale", "post", url, data, {
        "formatVersion": "1",
        "QRType": "12"
    })
    print(json.dumps([response]))
