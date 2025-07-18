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
        each_loop_results = []

        for file in selected_files:
            file_path = os.path.join(BASE_DIR, file.lstrip("/\\"))
            print("file_path", file_path)
            try:
                result = subprocess.run(
                    ["pytest", "-s", file_path],
                    capture_output=True, text=True, timeout=60
                )
                responseArray = result.stdout.strip().split('\n')
                print("responseArraysdfsafsdfs", responseArray)
                parsedApiResults = json.loads(responseArray[6].split(".py ")[1])
                print("parsedApiResults", parsedApiResults)
                each_loop_results.append({
                    "fileName": file,
                    "data": parsedApiResults
                })
            except Exception as e:
                each_loop_results.append({
                    "fileName": file,
                    "error": str(e)
                })

        pytest_results.append(each_loop_results)

        if i < loop_count - 1:
            print(f"Finished round {i+1}, waiting 3 seconds before next loop...")
            time.sleep(3)

    print("pytest_resultsasdf", pytest_results)

    return pytest_results


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

if __name__ == "__main__":
    app.run(debug=True, port=5001)

#time.sleep(10)