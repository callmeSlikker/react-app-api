import axios from "axios";
import { useState, useRef } from "react";
import { RunUnitTestsResultSection } from "./RunUnitTestsResult/RunUnitTestsResultSection";
import { UnitTestResult } from "./RunUnitTestsResult/RunUnitTestResult";
import FileTreeView from "./FileTest/FileTreeView";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FileNodeFile, TEST_FILES } from "../../tests/test";
import { RequestWithValidationResult } from "../../tests/requestWithValidation";

export type SelectedFile = {
  fileName: string;
  func: (fileName: string) => Promise<RequestWithValidationResult[]>;
};

export default function PyTestRunner() {
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const [results, setResults] = useState<UnitTestResult[][]>([]);
  const [loopCount, setLoopCount] = useState(1);

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
    <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
      <div style={{ display: "flex", flex: 1 }}>
        <div
          style={{
            width: "20%",
            padding: "8px",
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "space-between",
            marginTop: 25,
          }}
        >
          <div>
            <div>
              <p
                style={{
                  fontFamily: "revert-layer",
                  fontSize: 20,
                  fontWeight: 1000,
                  margin: 0,
                }}
              >
                Test Case 🗄️
              </p>
              <p
                style={{
                  fontFamily: "revert-layer",
                  fontSize: 18,
                  fontWeight: 700,
                  marginBottom: 10,
                  marginTop: 10,
                }}
              >
                select test files
              </p>
            </div>
          </div>
          <div
            style={{
              marginTop: 20,
              marginBottom: 20,
              maxHeight: "50vh",
              overflowY: "auto",
            }}
          >
            <FileTreeView
              fileTree={TEST_FILES}
              selectedFiles={selectedFiles}
              toggleFile={toggleFile}
            />
          </div>
        </div>

        <div
          style={{
            width: "80%",
            padding: "8px",
            display: "flex",
            flexDirection: "column",
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
            <p className="title"
              style={{
                fontSize: 20, 
                fontWeight: 500 ,
                fontFamily: "revert-layer",
                marginBottom: 10,
                width: "25%",
              }}
            >
              Result
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
      </div>

      <div
        style={{
          background: "#fff",
          borderTop: "1px solid #ccc",
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          zIndex: 1000,
          bottom: 0,
          left: 0,
        }}
      >
        <div style={{ margin: "10px" }}>
          <label
            htmlFor="loopCount"
            style={{
              margin: 5,
              fontFamily: "revert-layer",
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            Loop count :
          </label>
          <input
            style={{
              paddingLeft: 6,
              height: 28,
              width: 42,
              borderBlockColor: "lightgray",
              borderRadius: 3,
            }}
            id="loopCount"
            type="number"
            min="1"
            value={loopCount}
            onChange={(e) => setLoopCount(Number(e.target.value))}
          />
        </div>

        <div>
          <button
            onClick={() => runTestsMutation.mutate()}
            disabled={isRunningTets}
            style={{ margin: 5, borderBlockColor: "black", background: "none" }}
          >
            Start
          </button>

          <button
            onClick={reset}
            disabled={isRunningTets}
            style={{ margin: 5, borderBlockColor: "black", background: "none" }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
