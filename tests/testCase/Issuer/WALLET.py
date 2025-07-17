import json
from tests.common.request import requestWithValidation

def test_sale_wallet():
    url = "http://localhost:9092/createRequest"
    data = {
        "CATEGORY": "com.pax.payment.SaleCredit",
        "parm": {
            "header": {
                "formatVersion": "1",
                "endPointNamespace": "com.pax.edc.bpsp"
            },
            "detail": {
                "amountValue": 3.00
            }
        }
    }

    expected_response = {
        "amount": "300",
        "voucherNo": "ANY_VALUE",
        "cardIssuerID": "01",
        "cardIssuerName": "WALLET"
    }

    response = requestWithValidation("Create Sale", "post", url, data, expected_response)
    
    print(json.dumps([response]))
