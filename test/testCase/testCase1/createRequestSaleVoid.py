import json
from test.common.request import requestWithValidation

def test_sale_then_void():
    url = "http://localhost:9092/createRequest"

    # === SALE ===
    sale_data = {
        "CATEGORY": "com.pax.payment.Sale",
        "parm": {
            "amount": 100,
            "tipAmount": 10,
            "currencyCode": "JPY"
        }
    }

    results = []

    sale_response = requestWithValidation("Create Sale", "post", url, sale_data, {
            "amount": "110",
            "voucherNo": "ANY_VALUE"
        })

    results.append(sale_response)
    
    if sale_response.get("error"):
        print(json.dumps(results))
        return

    responseBody = sale_response.get("response").get("body")

    if responseBody is not None:
        voucher_no = responseBody.get("voucherNo")

        void_data = {
            "CATEGORY": "com.pax.payment.Void",
            "parm": {
                "voucherNo": voucher_no
            }
        }

        void_response = requestWithValidation("Void Sale", "post", url, void_data, {
            "amount": "110",
            "voucherNo": "ANY_VALUE"
        })
        results.append(void_response)

        print(json.dumps(results))
