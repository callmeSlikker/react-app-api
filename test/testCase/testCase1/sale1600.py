import json
from test.common.request import requestWithValidation


def test_create_sale_request():
    url = "http://localhost:9092/createRequest"
    data = {
        "CATEGORY": "com.pax.payment.Sale",
        "parm": {
            "amount": 1600,
            "tipAmount": 10,
            "currencyCode": "JPY"
        }
    }

    response = requestWithValidation("Create Sale", "post", url, data, {
        "amount": "1610",
        "voucherNo": "ANY_VALUE"
    })
    print(json.dumps([response]))
