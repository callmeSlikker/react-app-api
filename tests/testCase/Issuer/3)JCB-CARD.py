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
        "detail.cardIssuerName": "JCB-CARD",
        "detail.cardIssuerID": "02",
        "detail.merchantNameInSlipL1": "Merchant 1",
        "detail.addressInSlipL2": "normal functions",
        "detail.addressInSlipL3": "A920",
        "header.terminalID": "50118674",
    }

    response = requestWithValidation("Create Sale", "post", url, data, expected_response)
    
    print(json.dumps([response]))
