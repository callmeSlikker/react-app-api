from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import subprocess
import json
import requests
import time

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.join(os.path.dirname(__file__), "tests", "testCase")
HEADERS = {"Content-Type": "application/json"}
  


@app.route("/start-tests", methods=["POST", "OPTIONS"])
def start_tests():
    if request.method == "OPTIONS":
        return '', 204  # สำหรับ CORS preflight

    data = request.json
    selected_files = data.get("files", [])
    loop_count = data.get("loopCount", 1)

    pytest_results = []

    for i in range(loop_count):
        print(f"=== Start loop {i+1}/{loop_count} ===")
        each_loop_results = []

        for file_index, file in enumerate(selected_files):
            file_path = os.path.join(BASE_DIR, file.lstrip("/\\"))
            print(f"Running file ({file_index+1}/{len(selected_files)}): {file_path}")

            try:
                result = subprocess.run(
                    ["pytest", "-s", file_path],
                    capture_output=True, text=True, timeout=70
                )
                response_array = result.stdout.strip().split('\n')
                print("Raw Output:", response_array)

                # ปรับให้ตรวจสอบบรรทัดที่มี JSON
                json_line = next((line for line in response_array if ".py " in line and "{" in line), None)
                parsed_api_results = json.loads(json_line.split(".py ")[1]) if json_line else {}

                each_loop_results.append({
                    "fileName": file,
                    "data": parsed_api_results
                })
            except Exception as e:
                each_loop_results.append({
                    "fileName": file,
                    "error": str(e)
                })

            if file_index < len(selected_files) - 1:
                print("Waiting 10 seconds before running next file...")
                time.sleep(10)

        pytest_results.append(each_loop_results)

        if i < loop_count - 1:
            print(f"Finished loop {i+1}, waiting 3 seconds before next loop...")
            time.sleep(3)

    return jsonify(pytest_results)



@app.route("/inquiry", methods=["POST"])
def inquiry():
    try:
        req_data = request.get_json()
        qr_type = req_data.get("qrType")
        invoice_trace = req_data.get("invoiceTraceNumber")

        edc_request_data = {
            "CATEGORY": "com.pax.payment.Inquiry",
            "parm": {
                "header": {
                    "formatVersion": "1",
                    "endPointNamespace": "com.pax.edc.bpsp"
                },
                "detail": {
                    "QRType": qr_type,
                    "invoiceTraceNumber": invoice_trace
                }
            }
        }

        url = "http://localhost:9092/createRequest"
        response = requestWithValidation("Inquiry", "post", url, edc_request_data)

        for key in ["error", "function", "success"]:
            response.pop(key, None)

        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/cancle", methods=["POST"])
def cancle():
    try:
        req_data = request.get_json()
        qr_type = req_data.get("qrType")
        invoice_trace = req_data.get("invoiceTraceNumber")

        edc_request_data = {
            "CATEGORY": "com.pax.payment.CancelCommand",
            "parm": {
                "header": {
                    "formatVersion": "1",
                    "endPointNamespace": "com.pax.edc.bpsp"
                },
                "detail": {
                    "QRType": qr_type,
                    "invoiceTraceNumber": invoice_trace
                }
            }
        }

        url = "http://localhost:9092/createRequest"
        response = requestWithValidation("cancle", "post", url, edc_request_data)

        for key in ["error", "function", "success"]:
            response.pop(key, None)

        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# @app.route("/void", methods=["POST"])
# def void():
#     try:
#         req_data = request.get_json()
#         invoice_trace = req_data.get("invoiceTraceNumber")

#         edc_request_data = {
#             "CATEGORY": "com.pax.payment.Void",
#             "parm": {
#                 "header": {
#                     "formatVersion": "1",
#                     "endPointNamespace": "com.pax.edc.bpsp"
#                 },
#                 "detail": {
#                     "invoiceTraceNumber": invoice_trace
#                 }
#             }
#         }

#         url = "http://localhost:9092/createRequest"
#         response = requestWithValidation("void", "post", url, edc_request_data)

#         for key in ["error", "function", "success"]:
#             response.pop(key, None)

#         return jsonify(response)

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5001)

#time.sleep(10)