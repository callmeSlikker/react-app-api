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
        "amount": "200",
        "voucherNo": "ANY_VALUE",
        "cardIssuerID": "03",
        "cardIssuerName": "QR PromptP"
    }

    response = requestWithValidation("Create Sale", "post", url, data, expected_response)
    
    print(json.dumps([response]))
