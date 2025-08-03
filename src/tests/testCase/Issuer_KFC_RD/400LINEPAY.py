import json
from tests.common.request import requestWithValidation


def test_sale_linepay():
    url = "http://localhost:9092/createRequest"
    data = {
    "CATEGORY": "com.pax.payment.SaleLinePay",
        "parm": {
            "header": 
            {
                "formatVersion": "1",
                "endPointNamespace": "com.pax.edc.bpsp"
            },
            "detail":
            {
                "amountValue": 3.00
            }
        }
    }

    expected_response = {
        "detail.expiredDate":"XXXX",
        "detail.cardIssuerName": "LINEPAY",
        "detail.cardIssuerID": "03",
        "detail.merchantID":"000002200869253",
        "header.responseCode": "00",
    }


    response = requestWithValidation("Create Sale", "post", url, data, expected_response)
    
    print(json.dumps([response]))

