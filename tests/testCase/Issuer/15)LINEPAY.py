import json
from tests.common.request import requestWithValidation


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

    # expected_response = {
    #     "voucherNo": "ANY_VALUE",
    #     "cardIssuerID": "09",
    #     "cardIssuerName": "LINEPAY"
    # }

    response = requestWithValidation("Create Sale", "post", url, data)
    
    print(json.dumps([response]))
