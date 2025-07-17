import json
from tests.common.request import requestWithValidation


def sale_qrmaster():
    url = "http://localhost:9092/createRequest"
    data = {
        "CATEGORY": "com.pax.payment.SaleQR",
        "parm": {
            "amount": 1500,
            "tipAmount": 00,
            "currencyCode": "JPY"
        }
    }

    response = requestWithValidation("Create Sale", "post", url, data, {
        "amount": "1500",
        "voucherNo": "ANY_VALUE",
        "expiredDate": "XXXX",
        "cardHolderName": "“XXXXXXXXXX",
        "cardIssuerID": "06",
        "cardIssuerName": "QR MASTER"
    })
    print(json.dumps([response]))
