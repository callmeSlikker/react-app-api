import json
from tests.common.request import requestWithValidation


def inquiry_qr():
    url = "http://localhost:9092/createRequest"
    data = {
    "CATEGORY": "com.pax.payment.Inquiry",
        "parm": {
            "header": 
            {
                "formatVersion": "1",
                "endPointNamespace": "com.pax.edc.bpsp"
            },
            "detail":
            {
                "QRType": "01",
                "trace": "002266"
            }
        }
    }

    response = requestWithValidation("Create Sale", "post", url, data)
    
    print(json.dumps([response]))
