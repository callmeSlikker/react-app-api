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

    # expected_response = {
    #     "amount": "204",
    #     "voucherNo": "ANY_VALUE",
    #     "cardIssuerID": "02",
    #     "cardIssuerName": "QR UnionPa"
    # }

    response = requestWithValidation("Create Sale", "post", url, data)
    
    print(json.dumps([response]))
