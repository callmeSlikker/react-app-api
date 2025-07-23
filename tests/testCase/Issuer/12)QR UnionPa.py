import json
from tests.common.request import requestWithValidation

def test_sale_qrc_unionpay():
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
                "amountValue": 2.04
            }
        }
    }

    expected_response = {
        "detail.cardIssuerName": "QR UnionPa",
        "detail.cardIssuerID": "05",
        "detail.merchantNameInSlipL1": "Merchant 1",
        "detail.addressInSlipL2": "normal functions",
        "detail.addressInSlipL3": "A920",
        "header.terminalID": "47848651",
    }

    response = requestWithValidation("Create Sale", "post", url, data, expected_response)
    
    print(json.dumps([response]))
