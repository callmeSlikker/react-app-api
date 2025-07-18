import json
from tests.common.request import requestWithValidation

def test_sale_qrc_master():
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
                "amountValue": 2.02
            }
        }
    }

    # expected_response = {
    #     "amount": "202",
    #     "voucherNo": "ANY_VALUE",
    #     "cardIssuerID": "06",
    #     "cardIssuerName": "QR MASTER"
    # }

    response = requestWithValidation("Create Sale", "post", url, data)
    
    print(json.dumps([response]))
