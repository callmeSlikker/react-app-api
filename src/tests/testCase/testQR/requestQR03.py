import json
from tests.common.request import requestWithValidation

def test_sale_qr03():
    url = "http://localhost:9092/createRequest"
    data = {
    "CATEGORY": "com.pax.payment.RequestQR",
        "parm": {
            "header": 
            {
                "formatVersion": "1",
                "endPointNamespace": "com.pax.edc.bpsp"
            },
            "detail":
            {
                "amountValue": 1.03,
                "QRType": "03"
            }
        }
    }


    expected_response = {
        "detail.QRType": "03",
        "header.responseCode": "00",
    }


    response = requestWithValidation("Create Sale", "post", url, data, expected_response)
    
    print(json.dumps([response]))