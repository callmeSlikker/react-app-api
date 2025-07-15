import json
from test.common.request import requestWithValidation


def sale_wallet():
    url = "http://localhost:9092/createRequest"
    data = {
    "CATEGORY": "com.pax.payment.SaleWalle",
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
