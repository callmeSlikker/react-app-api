import json
from tests.common.request import requestWithValidation

def test_sale_wallet():
    url = "http://localhost:9092/createRequest"
    data = {
        "CATEGORY": "com.pax.payment.SaleWallet",
        "parm": {
            "header": {
                "formatVersion": "1",
                "endPointNamespace": "com.pax.edc.bpsp"
            },
            "detail": {
                "amountValue": 1.00
            }
        }
    }


    expected_response = {
        "detail.expiredDate":"XXXX",
        "detail.cardIssuerName": "WALLET",
        "detail.cardIssuerID": "01",
        "detail.merchantNameInSlipL1": "Merchant 1",
        "detail.addressInSlipL2": "normal functions",
        "detail.addressInSlipL3": "A920",
        "header.terminalID": "48831204",
        "detail.merchantID":"000002200869253",
        "header.responseCode": "00",
    }


    response = requestWithValidation("Create Sale", "post", url, data, expected_response)
    
    print(json.dumps([response]))
