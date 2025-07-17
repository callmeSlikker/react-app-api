import json
from tests.common.request import requestWithValidation

def test_sale_credit_diners():
    url = "http://localhost:9092/createRequest"
    data = {
        "CATEGORY": "com.pax.payment.SaleCredit",
        "parm": {
            "header": {
                "formatVersion": "1",
                "endPointNamespace": "com.pax.edc.bpsp"
            },
            "detail": {
                "amountValue": 1.05
            }
        }
    }

    expected_response = {
        "amount": "105",
        "voucherNo": "ANY_VALUE",
        "cardIssuerID": "12",
        "cardIssuerName": "DINERS"
    }

    response = requestWithValidation("Create Sale", "post", url, data, expected_response)
    
    print(json.dumps([response]))