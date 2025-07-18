import json
from tests.common.request import requestWithValidation

def test_sale_credit_master():
    url = "http://localhost:9092/createRequest"
    data = {
        "CATEGORY": "com.pax.payment.SaleCredit",
        "parm": {
            "header": {
                "formatVersion": "1",
                "endPointNamespace": "com.pax.edc.bpsp"
            },
            "detail": {
                "amountValue": 1.02
            }
        }
    }

    # expected_response = {
    #     "amount": "102",
    #     "voucherNo": "ANY_VALUE",
    #     "cardIssuerID": "06",
    #     "cardIssuerName": "MASTERCARD"
    # }

    response = requestWithValidation("Create Sale", "post", url, data)
    
    print(json.dumps([response]))
