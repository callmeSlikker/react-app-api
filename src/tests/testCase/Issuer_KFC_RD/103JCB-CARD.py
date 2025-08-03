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

    expected_response = {
        "detail.expiredDate":"XXXX",
        "detail.cardIssuerName": "JCB-CARD",
        "detail.cardIssuerID": "05",
        "detail.merchantID":"000002200869253",
        "header.responseCode": "00",
    }
    
    response = requestWithValidation("Create Sale", "post", url, data, expected_response)
    
    print(json.dumps([response]))
