import json
from src.tests.common.request import requestWithValidation


def test_sale_linepay():
    url = "http://localhost:9092/createRequest"
    data = {
    "CATEGORY": "com.pax.payment.SaleLinePay",
        "parm": {
            "header": 
            {
                "formatVersion": "1",
                "endPointNamespace": "com.pax.edc.bpsp"
            },
            "detail":
            {
                "VATAmount": 12345678.00,
                "taxAllowanceAmoun": 12345678.00,
                "merchantUniqueValue": "12345678901234567890",
                "campaignType": "123456",
                "marchantTaxID": "12345678901234567890"
            }
        }
    }

        expected_response = {
        "VATAmount": 12345678.00,
        "campaignType": "123456",
    }

    response = requestWithValidation("Create Sale", "post", url, data, {
        "formatVersion": "1",
    })
    print(json.dumps([response]))
