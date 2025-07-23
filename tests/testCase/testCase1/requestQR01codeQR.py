import json
from tests.common.request import requestWithValidation

def test_sale_qrc_tpn():
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
                "amountValue": 15.00,
                "QRType": "01"
            }
        }
    }


    response = requestWithValidation("Create Sale", "post", url, data)
    
    print(json.dumps([response]))