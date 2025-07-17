import json
from tests.common.request import requestWithValidation

def test_sale_qr():
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
                "amountValue": 1.00
            }
        }
    }

    expected_response = {
        "amount": "100",
        "voucherNo": "ANY_VALUE",
    }

    response = requestWithValidation("Create Sale", "post", url, data, expected_response)
    
    print(json.dumps([response]))
