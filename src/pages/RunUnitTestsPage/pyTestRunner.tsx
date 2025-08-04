import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { RunUnitTestsResultSection } from "./RunUnitTestsResult/RunUnitTestsResultSection";
import { UnitTestResult } from "./RunUnitTestsResult/RunUnitTestResult";
import FileTreeView from "./FileTest/FileTreeView";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FileNodeFile, TEST_FILES } from "../../tests/test";
import { RequestWithValidationResult } from "../../tests/requestWithValidation";
import testertoolicon from "../../pic/testertoolicon.png";
import { useConnectionStore } from "./ConnectDevice/store/useConnectionStore";

export type SelectedFile = {
  fileName: string;
  func: (fileName: string) => Promise<RequestWithValidationResult[]>;
};

export default function PyTestRunner() {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const [results, setResults] = useState<UnitTestResult[][]>([]);
  const [loopCount, setLoopCount] = useState(1);
  const isCloudConnected = useConnectionStore(
    (state) => state.isCloudConnected
  );
  const isWifiConnected = useConnectionStore((state) => state.isWifiConnected);

  const reset = () => {
    setSelectedFiles([]);
  };

  const runTestsMutation = useMutation({
    mutationFn: async () => {
      const allResults: UnitTestResult[][] = [];

      for (let loopIndex = 0; loopIndex < loopCount; loopIndex++) {
        const loopResults: UnitTestResult[] = [];

        for (const selected of selectedFiles) {
          const testResults = await selected.func(selected.fileName);

          testResults.forEach((res) => {
            loopResults.push({
              fileName: selected.fileName,
              data: [res], // Or map appropriately
            });
          });
        }

        allResults.push(loopResults);
      }

      return allResults;
    },
    onSuccess: (data) => {
      setResults(data);
    },
    onError: (error: any) => {
      alert("Error running tests: " + error.message);
    },
  });
  const toggleFile = (fileNode: FileNodeFile) => {
    setSelectedFiles((prev) => {
      const exists = prev.find((f) => f.fileName === fileNode.name);
      if (exists) {
        return prev.filter((f) => f.fileName !== fileNode.name);
      } else {
        return [...prev, { fileName: fileNode.name, func: fileNode.function }];
      }
    });
  };

  const isRunningTets = runTestsMutation.isPending;

  return (
    <div>
      <button
        className="title"
        onClick={() => navigate("/")} // หรือ path ของ HomePage.tsx ถ้าคุณตั้งชื่ออื่น
        style={{
          backgroundColor: "#ffffffff",
          position: "fixed",
          top: 10,
          left: 10,
          color: "#000000ff",
          borderRadius: "45%",
          fontSize: 30,
          cursor: "pointer",
          border: "1px solid #ffffffff",
        }}
      >
        ⮜
      </button>
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          gap: 50,
          marginBottom: 0,
          marginLeft: 50,
          marginTop: 40,
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "space-between",
              background: "rgba(255, 255, 255)",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                {/* ซ้าย: รูปภาพ */}
                <img
                  src={testertoolicon}
                  style={{ width: 150, height: 150, objectFit: "contain" }}
                  alt="icon"
                />

                {/* ขวา: ตัวหนังสือ */}
                <div>
                  <ul
                    style={{
                      display: "flex",
                      justifyContent: "left",
                      gap: 15,
                      margin: 0,
                    }}
                  >
                    <li
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        paddingLeft: 10,
                        paddingRight: 10,
                        backgroundColor: "#ffffffff",
                        borderRadius: "20px",
                        border: "1px solid #a1b8e6ff",
                        boxShadow: "0 4px 12px rgba(98, 126, 202, 0.5)",
                        height: 40,
                        width: 60,
                      }}
                    >
                      <p
                        className="title"
                        style={{
                          fontSize: 14,
                          color: isCloudConnected ? "black" : "black",
                        }}
                      >
                        cloud
                      </p>
                      {isCloudConnected ? "" : ""}
                      {isCloudConnected && (
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            backgroundColor: "green",
                            display: "inline-block",
                          }}
                        ></span>
                      )}
                    </li>
                    <li
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        paddingLeft: 10,
                        paddingRight: 10,
                        backgroundColor: "#ffffffff",
                        borderRadius: "20px",
                        border: "1px solid #a1b8e6ff",
                        boxShadow: "0 4px 12px rgba(98, 126, 202, 0.5)",
                        height: 40,
                        width: 60,
                      }}
                    >
                      <p
                        className="title"
                        style={{
                          fontSize: 14,
                          color: isCloudConnected ? "black" : "black",
                        }}
                      >
                        WiFi
                      </p>
                      {isWifiConnected ? "" : ""}
                      {isWifiConnected && (
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            backgroundColor: "green",
                            display: "inline-block",
                          }}
                        ></span>
                      )}
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <p
                  className="title"
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    fontFamily: "revert-layer",
                    marginLeft: 30,
                    marginBottom: 10,
                  }}
                >
                  TEST CASE
                </p>
                <p
                  className="title"
                  style={{
                    fontSize: 20,
                    fontWeight: 500,
                    fontFamily: "revert-layer",
                    marginLeft: 55,
                    marginTop: 0,
                    marginBottom: 0,
                  }}
                >
                  select test files
                </p>
              </div>
            </div>
            <div
              className="title"
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginLeft: 55,
                marginTop: 20,
                marginBottom: 0,
              }}
            >
              <FileTreeView
                fileTree={TEST_FILES}
                selectedFiles={selectedFiles}
                toggleFile={toggleFile}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            width: "78%",
            display: "flex",
            flexDirection: "column",
            marginTop: 30,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <p
              className="title"
              style={{
                fontSize: 30,
                fontWeight: 700,
                fontFamily: "revert-layer",
                marginLeft: 0,
                marginBottom: 10,
              }}
            >
              RESULTS
            </p>
            <button
              onClick={() => setResults([])}
              style={{
                backgroundColor: "#ff4d4f",
                color: "white",
                border: "none",
                borderRadius: 4,
                padding: "4px 8px",
                cursor: "pointer",
                width: 80,
                height: 24,
                margin: 20,
              }}
            >
              Clear All
            </button>
          </div>

          <RunUnitTestsResultSection
            results={results}
            isRunningTets={isRunningTets}
          />
        </div>

        <div
          className="title"
          style={{
            position: "fixed", // ✅ ตรึงไว้กับหน้าจอ
            background: "#d2edffff",
            borderTop: "2px solid #0067ddff",
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            zIndex: 1000,
            bottom: 0,
            left: 0,
            marginTop: 0,
          }}
        >
          <div style={{ margin: "10px" }}>
            <label
              htmlFor="loopCount"
              style={{
                margin: 5,
                fontFamily: "revert-layer",
                fontSize: 20,
                fontWeight: 600,
                marginRight: 10,
              }}
            >
              Loop count :
            </label>
            <input
              style={{
                paddingLeft: 10,
                height: 28,
                width: 42,
                border: "2px solid #0135a5ff",
                borderRadius: 4,
                marginRight: 10,
              }}
              id="loopCount"
              type="number"
              min="1"
              value={loopCount}
              onChange={(e) => setLoopCount(Number(e.target.value))}
            />
          </div>

          <div
            className="title"
            style={{
              display: "flex",
              alignContent: "center",
              gap: 20,
            }}
          >
            <button
              onClick={() => runTestsMutation.mutate()}
              disabled={isRunningTets}
              style={{
                color: "#0135a5ff",
                fontSize: 16,
                fontWeight: 800,
                display: "flex",
                alignItems: "center", // จัดกลางแนวตั้ง
                justifyContent: "center", // จัดกลางแนวนอน
                backgroundColor: "#77adffff",
                borderRadius: "5px",
                border: "3px solid #0135a5ff",
                height: 35,
                width: 200,
                textAlign: "center", // เสริมเพื่อความชัวร์
              }}
            >
              START
            </button>

            <button
              onClick={reset}
              disabled={isRunningTets}
              style={{
                backgroundColor: "#0084ffff",
                color: "white",
                border: "none",
                borderRadius: 4,
                fontSize: 16,
                fontWeight: 500,
                cursor: "pointer",
                width: 80,
                height: 35,
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
