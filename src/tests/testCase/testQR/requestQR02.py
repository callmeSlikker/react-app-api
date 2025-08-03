import json
from tests.common.request import requestWithValidation

def test_sale_qr02():
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
                "amountValue": 1.02,
                "QRType": "02"
            }
        }
    }


    expected_response = {
        "detail.QRType": "02",
        "header.responseCode": "00",
    }


    response = requestWithValidation("Create Sale", "post", url, data, expected_response)
    
    print(json.dumps([response]))