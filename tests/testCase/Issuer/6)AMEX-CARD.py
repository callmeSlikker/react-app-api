import json
from tests.common.request import requestWithValidation

def test_sale_credit_amex():
    url = "http://localhost:9092/createRequest"
    data = {
        "CATEGORY": "com.pax.payment.SaleCredit",
        "parm": {
            "header": {
                "formatVersion": "1",
                "endPointNamespace": "com.pax.edc.bpsp"
            },
            "detail": {
                "amountValue": 1.06
            }
        }
    }

    # expected_response = {
    #     "amount": "106",
    #     "voucherNo": "ANY_VALUE",
    #     "cardIssuerID": "08",
    #     "cardIssuerName": "AMEX-CARD"
    # }

    response = requestWithValidation("Create Sale", "post", url, data)
    
    print(json.dumps([response]))