import axios from "axios";
import { useState, useRef } from "react";
import { ConnectDeviceToWifiSection } from "./ConnectDevice/ConnectDeviceToWifiSection.tsx";
import { ConnectDeviceToCloudSection } from "./ConnectDevice/ConnectDeviceToCloudSection.tsx";
import { RunUnitTestsResultSection } from "./RunUnitTestsResult/RunUnitTestsResultSection.tsx";
import { UnitTestResult } from "./RunUnitTestsResult/RunUnitTestResult.tsx";
import FileTreeView from "./FileTest/FileTreeView.tsx";
import { Settlement } from "./Settlement/Settlement.tsx";
import { useQuery, useMutation } from "@tanstack/react-query";

export default function PyTestRunner() {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [results, setResults] = useState<UnitTestResult[][]>([]);
  const [loopCount, setLoopCount] = useState(1);
  const [inquiryResponses, setInquiryResponses] = useState<Record<string, any>>({});
  const [cancelResponses, setCancelResponses] = useState<Record<string, any>>({});
  const [voidResponses, setVoidResponses] = useState<Record<string, any>>({});

  const reset = () => {
    setSelectedFiles([]);
  };

  const {
    data: fileTree = [],
    isLoading: isFileTreeLoading,
  } = useQuery({
    queryKey: ["unitTestFiles"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5001/list-files");
      return res.data;
    },
  });

  const runTestsMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post("http://localhost:5001/start-tests", {
        files: selectedFiles,
        loopCount: loopCount,
      });
      return response.data;
    },
    onSuccess: (data) => {
      setResults(data);
    },
    onError: (error: any) => {
      alert("Error running tests: " + error.message);
    },
  });

  const toggleFile = (filePath: string) => {
    setSelectedFiles((prev) =>
      prev.includes(filePath)
        ? prev.filter((f) => f !== filePath)
        : [...prev, filePath]
    );
  };

  const isRunningTets = runTestsMutation.isPending || isFileTreeLoading;

  return (
    <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ width: "20%", padding: "8px", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between", marginTop: 25 }}>
          <div>
            <div style={{ marginBottom: 10 }}><ConnectDeviceToCloudSection /></div>
            <div style={{ marginBottom: 25 }}><ConnectDeviceToWifiSection /></div>
            <div>
              <p style={{ fontFamily: "revert-layer", fontSize: 20, fontWeight: 1000, margin: 0 }}>Test Case 🗄️</p>
              <p style={{ fontFamily: "revert-layer", fontSize: 18, fontWeight: 700, marginBottom: 10, marginTop: 10 }}>select test files</p>
            </div>
          </div>
          <div style={{
            marginTop: 20,
            marginBottom: 20,
            maxHeight: "50vh",
            overflowY: "auto",
          }}>
            <FileTreeView fileTree={fileTree} selectedFiles={selectedFiles} toggleFile={toggleFile} />
          </div>
          <div style={{ marginTop: 20, marginBottom: 20 }}>
            <Settlement />
          </div>
        </div>

        <div style={{ width: "80%", padding: "8px", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
            <p style={{ fontFamily: "revert-layer", fontSize: 20, fontWeight: 1000, marginBottom: 10, width: "25%" }}>
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
            inquiryResponses={inquiryResponses}
            cancelResponses={cancelResponses}
            voidResponses={voidResponses}
            isRunningTets={isRunningTets}
          />
        </div>
      </div>

      <div style={{
        background: "#fff",
        borderTop: "1px solid #ccc",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        zIndex: 1000,
        bottom: 0,
        left: 0,
      }}>
        <div style={{ margin: "10px" }}>
          <label htmlFor="loopCount" style={{ margin: 5, fontFamily: "revert-layer", fontSize: 16, fontWeight: 500 }}>Loop count :</label>
          <input
            style={{ paddingLeft: 6, height: 28, width: 42, borderBlockColor: "lightgray", borderRadius: 3 }}
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