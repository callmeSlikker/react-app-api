import json
from tests.common.request import requestWithValidation

def test_sale_credit_unionpay():
    url = "http://localhost:9092/createRequest"
    data = {
        "CATEGORY": "com.pax.payment.SaleCredit",
        "parm": {
            "header": {
                "formatVersion": "1",
                "endPointNamespace": "com.pax.edc.bpsp"
            },
            "detail": {
                "amountValue": 1.04
            }
        }
    }

    expected_response = {
        "detail.cardIssuerName": "UNIONPAY",
        "detail.cardIssuerID": "10",
        "detail.merchantNameInSlipL1": "Merchant 1",
        "detail.addressInSlipL2": "normal functions",
        "detail.addressInSlipL3": "A920",
        "header.terminalID": "25296696",
    }

    response = requestWithValidation("Create Sale", "post", url, data, expected_response)
    
    print(json.dumps([response]))
