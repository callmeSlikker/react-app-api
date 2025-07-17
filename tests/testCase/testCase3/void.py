import json
from tests.common.request import requestWithValidation

def test_void():
    url = "http://localhost:9092/createRequest"
    data = {
        "CATEGORY": "com.pax.payment.Void",
        "parm": {
            "header": {
                "formatVersion": "1",
                "endPointNamespace": "com.pax.edc.bpsp"
            },
            "detail": {
                "invoiceTraceNumber": "1989"
            }
        }
    }

    expected_response = {
        "voucherNo": "ANY_VALUE",
    }

    response = requestWithValidation("Create Sale", "post", url, data, expected_response)
    
    print(json.dumps([response]))
