import json
from tests.common.request import requestWithValidation

def test_sale_credit():
    url = "http://localhost:9092/createRequest"
    data = {
        "CATEGORY": "com.pax.payment.SaleCredit",
        "parm": {
            "header": {
                "formatVersion": "1",
                "endPointNamespace": "com.pax.edc.bpsp"
            },
            "detail": {
                "amountValue": 15.00
            }
        }
    }

    expected_response = {
        "voucherNo": "ANY_VALUE",
        "cardIssuerID": "04",
        "cardIssuerName": "VISA-CARD"
    }

    response = requestWithValidation("Create Sale", "post", url, data, expected_response)
    
    print(json.dumps([response]))