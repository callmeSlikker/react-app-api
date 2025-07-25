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
        "detail.expiredDate":"XXXX",
        "header.responseCode": "00",
        "detail.cardIssuerName": "DINERS",
        "detail.cardIssuerID": "12",
        "detail.merchantNameInSlipL1": "Merchant 1",
        "detail.addressInSlipL2": "normal functions",
        "detail.addressInSlipL3": "A920",
        "header.terminalID": "25296696",
        "detail.merchantID":"000002200869253",
        "header.responseCode": "00",
    }

    response = requestWithValidation("Create Sale", "post", url, data, expected_response)
    
    print(json.dumps([response]))
