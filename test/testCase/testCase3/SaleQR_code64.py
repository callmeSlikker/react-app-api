import json
from test.common.request import requestWithValidation


def sale_qr():
    url = "http://localhost:9092/createRequest"
    data = {
        "CATEGORY": "com.pax.payment.SaleRQ",
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

    response = requestWithValidation("Create Sale QR", "post", url, data, {
        "formatVersion": "1",
        "amountValue": 15.00
    })py
    print(json.dumps([response]))
