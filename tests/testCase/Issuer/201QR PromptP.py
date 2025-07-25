import json
from tests.common.request import requestWithValidation

def test_sale_qrc_promptpay():
    url = "http://localhost:9092/createRequest"
    data = {
        "CATEGORY": "com.pax.payment.SaleQR",
        "parm": {
            "header": {
                "formatVersion": "1",
                "endPointNamespace": "com.pax.edc.bpsp"
            },
            "detail":
            {
                "amountValue": 2.00
            }
        }
    }

    expected_response = {
        "detail.expiredDate":"XXXX",
        "detail.cardIssuerName": "QR PromptP",
        "detail.cardIssuerID": "03",
        "detail.merchantNameInSlipL1": "Merchant 1",
        "detail.addressInSlipL2": "normal functions",
        "detail.addressInSlipL3": "A920",
        "header.terminalID": "47848651",
        "detail.merchantID":"000002200869253",
        "header.responseCode": "00",
    }

    response = requestWithValidation("Create Sale", "post", url, data, expected_response)
    
    print(json.dumps([response]))
