import json
from tests.common.request import requestWithValidation

def test_sale_qrc_visa():
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
                "amountValue": 2.01
            }
        }
    }

    expected_response = {
        "amount": "201",
        "voucherNo": "ANY_VALUE",
        "cardIssuerID": "04",
        "cardIssuerName": "QR VISAR"
    }

    response = requestWithValidation("Create Sale", "post", url, data, expected_response)
    
    print(json.dumps([response]))
