import json
from tests.common.request import requestWithValidation

def test_sale_credit_jcb():
    url = "http://localhost:9092/createRequest"
    data = {
        "CATEGORY": "com.pax.payment.SaleCredit",
        "parm": {
            "header": {
                "formatVersion": "1",
                "endPointNamespace": "com.pax.edc.bpsp"
            },
            "detail": {
                "amountValue": 1.03
            }
        }
    }

    # expected_response = {
    #     "amount": "103",
    #     "voucherNo": "ANY_VALUE",
    #     "cardIssuerID": "02",
    #     "cardIssuerName": "JCB-CARD"
    # }

    response = requestWithValidation("Create Sale", "post", url, data)
    
    print(json.dumps([response]))
