import json
from tests.common.request import requestWithValidation

def test_sale_wallet():
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

    # expected_response = {
    #     "amount": "1500",
    #     "voucherNo": "ANY_VALUE",
    # }

    response = requestWithValidation("Create Sale", "post", url, data)

    print(json.dumps([response]))
