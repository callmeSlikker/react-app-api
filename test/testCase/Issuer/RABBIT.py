import json
from test.common.request import requestWithValidation


def sale_rabbit():
    url = "http://localhost:9092/createRequest"
    data = {
        "CATEGORY": "com.pax.payment.SaleRabbit",
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
        "cardIssuerID": "07",
        "cardIssuerName": "RABBIT"
    })
    print(json.dumps([response]))
