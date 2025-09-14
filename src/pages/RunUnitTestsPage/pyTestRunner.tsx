import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { RunUnitTestsResultSection } from "./RunUnitTestsResult/RunUnitTestsResultSection";
import { UnitTestResult } from "./RunUnitTestsResult/RunUnitTestResult";
import FileTreeView from "./FileTest/FileTreeView";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FileNodeFile, TEST_FILES } from "../../tests/test";
import { RequestWithValidationResult } from "../../tests/requestWithValidation";
import { useConnectionStore } from "./ConnectDevice/store/useConnectionStore";
import {
  HISTORY_STORAGE_KEY,
  useTestHistory,
} from "../../inputSale/hooks/useTestHistory";

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
  const { addHistory } = useTestHistory(HISTORY_STORAGE_KEY.AUTO_HISTORIES);

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
            addHistory(res);
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

  const isRunningSuccess = runTestsMutation.isSuccess;

  return (
    <div
      style={{
        maxWidth: "88%",
        margin: "30px auto",
        padding: "30px 24px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#ffffffff",
        borderRadius: 12,
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        color: "#333",
      }}
    >
      <div
        style={{
          fontSize: 42,
          fontWeight: 800,
          marginBottom: 10,
          textAlign: "center",
          color: "#284a7eff",
        }}
      >
        AUTOMATE TESTS
      </div>
      <button
        className="title"
        onClick={() => navigate("/")}
        style={{
          backgroundColor: "#ffffffff",
          position: "fixed",
          top: 20,
          left: 20,
          color: "#000000ff",
          fontSize: 18,
          cursor: "pointer",
          border: "1px solid #ffffffff",
        }}
      >
        ◀
      </button>
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          gap: 50,
          marginBottom: 0,
          marginLeft: 50,
          marginTop: 10,
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
                  src={"/testertoolicon.png"}
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
                    marginTop: 0,
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
                <div
                  className="title"
                  style={{
                    height: "43vh",
                    overflowY: "auto",
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
              <div>
                <div style={{ margin: "10px" }}>
                  <label
                    htmlFor="loopCount"
                    style={{
                      margin: 5,
                      fontSize: 18,
                      fontWeight: 700,
                      marginRight: 10,
                    }}
                  >
                    Loop count :
                  </label>
                  <input
                    style={{
                      paddingLeft: 10,
                      height: 25,
                      width: 38,
                      border: "3px solid #59b19bff",
                      borderRadius: 8,
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
                    disabled={runTestsMutation.isPending}
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#79f0d2ff",
                      color: "rgba(22, 58, 48, 1)",
                      borderRadius: 9,
                      cursor: "pointer",
                      height: 35,
                      width: 200,
                      textAlign: "center",
                      border: "3px solid #2b463fff",
                    }}
                  >
                    START
                  </button>

                  <button
                    onClick={reset}
                    disabled={isRunningSuccess}
                    style={{
                      backgroundColor: "#8c8d8dff",
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
          <div>
            <RunUnitTestsResultSection
              results={results}
              isRunningSuccess={isRunningSuccess}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
