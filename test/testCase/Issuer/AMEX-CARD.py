import json
from test.common.request import requestWithValidation


def sale_amexcard():
    url = "http://localhost:9092/createRequest"
    data = {
        "CATEGORY": "com.pax.payment.SaleCredit",
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
        "cardIssuerID": "08",
        "cardIssuerName": "AMEX-CARD"
    })
    print(json.dumps([response]))
