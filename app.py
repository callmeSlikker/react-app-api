from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import subprocess
import json
import requests
import time
from tests.common.request import requestWithValidation

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.join(os.path.dirname(__file__), "tests", "testCase")
HEADERS = {"Content-Type": "application/json"}

@app.route("/connect-wifi", methods=["POST"])
def connect_wifi():
    data = request.json

    try:
        response = requests.post("http://localhost:9092/connectDeviceByWifi", params={
            "port": data.get("port"),
            "host": data.get("host")
        })
        print("responseafdas", response)
        data = response.json()
        success = (

            response.status_code == 200 and
            data.get("resultCode") == "200" and
            data.get("message") == "connect success"
        )
        if success:
            result = {
                "resultCode": "200",
                "message": "connect success"
            }
        else:
            result = {
                "resultCode": "-111",
                "message": "connect error"
            }

    except Exception:
        result = {
            "resultCode": "-111",
            "message": "connect error"
        }

    return jsonify(result)


@app.route("/get-wifi-result", methods=["GET"])
def get_wifi_result():
    try:
        return send_file("resultWifi.json", mimetype='application/json')
    except FileNotFoundError:
        return jsonify({"resultCode": "-111", "message": "no result found"}), 404


@app.route("/connect-cloud", methods=["POST"])
def connect_cloud():
    data = request.json

    try:
        response = requests.post("http://localhost:9092/connectDeviceByCloud", 
        json={
            "code": data.get("code"),
            "eid": data.get("eid")
        })

        response_data = response.json()
        success = (
            response.status_code == 200 and
            response_data.get("resultCode") == "200" and
            response_data.get("message") == "connect success"
        )

        if success:
            result = {
                "resultCode": "200",
                "message": "connect success",
                "sn": response_data.get("sn")
            }
        else:
            result = {
                "resultCode": "-11",
                "message": "code is invalid"
            }

    except Exception:
        result = {
            "resultCode": "-11",
            "message": "code is invalid"
        }

    return jsonify(result)


@app.route("/get-cloud-result", methods=["GET"])
def get_cloud_result():
    try:
        return send_file("resultCloud.json", mimetype='application/json')
    except FileNotFoundError:
        return jsonify({"resultCode": "-11", "message": "code is invalid"}), 404
    

def list_directory(path):
    items = []
    for entry in os.scandir(path):
        if entry.name.startswith("__"):
            continue

        if entry.is_dir():
            items.append({
                "name": entry.name,
                "type": "folder",
                "children": list_directory(os.path.join(path, entry.name))
            })
        elif entry.is_file() and entry.name.endswith(".py"):
            items.append({
                "name": entry.name,
                "type": "file"
            })
    return items

@app.route("/list-files", methods=["GET"])
def get_files():
    try:
        file_tree = list_directory(BASE_DIR)
        return jsonify(file_tree)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

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
                    capture_output=True, text=True, timeout=60
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


@app.route("/settlement", methods=["POST"])
def settlement():
    url = "http://localhost:9092/createRequest"
    data = {
        "CATEGORY": "com.pax.payment.Settlement",
        "parm": {
            "isAllAcquirer": True,
            "acquirerNameList": ["acquirer0"]
        }
    }
    try:
        response = requestWithValidation("Create Settlement", "post", url, data)

        data = response.json()
        success = (

            response.status_code == 200 and
            data.get("resultCode") == "200" and
            data.get("message") == "settlement success"
        )
        if success:
            result = {
                "resultCode": "200",
                "message": "settlement success"
            }
        else:
            result = {
                "resultCode": "-111",
                "message": "settlement error"
            }

    except Exception:
        result = {
            "resultCode": "-111",
            "message": "settlement error"
        }

    return jsonify(result)

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
    
@app.route("/void", methods=["POST"])
def void():
    try:
        req_data = request.get_json()
        invoice_trace = req_data.get("invoiceTraceNumber")

        edc_request_data = {
            "CATEGORY": "com.pax.payment.Void",
            "parm": {
                "header": {
                    "formatVersion": "1",
                    "endPointNamespace": "com.pax.edc.bpsp"
                },
                "detail": {
                    "invoiceTraceNumber": invoice_trace
                }
            }
        }

        url = "http://localhost:9092/createRequest"
        response = requestWithValidation("void", "post", url, edc_request_data)

        for key in ["error", "function", "success"]:
            response.pop(key, None)

        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5001)

#time.sleep(10)