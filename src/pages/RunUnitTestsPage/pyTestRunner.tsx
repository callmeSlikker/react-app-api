import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { ConnectDeviceToWifiSection } from "./ConnectDevice/ConnectDeviceToWifiSection.tsx";
import { ConnectDeviceToCloudSection } from "./ConnectDevice/ConnectDeviceToCloudSection.tsx";
import { RunUnitTestsResultSection } from "./RunUnitTestsResult/RunUnitTestsResultSection.tsx";
import { UnitTestResult } from "./RunUnitTestsResult/RunUnitTestResult.tsx";
import FileTreeView, { FileNodeType } from "./FileTest/FileTreeView.tsx";
import { Settlement } from "./Settlement/Settlement.tsx";

export default function PyTestRunner() {
  const [fileTree, setFileTree] = useState<FileNodeType[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const [results, setResults] = useState<UnitTestResult[][]>([]);
  const [loading, setLoading] = useState(false);
  const [loopCount, setLoopCount] = useState(1);
  const [isLooping, setIsLooping] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const isLoopingRef = useRef(false);
  const isPausedRef = useRef(false);

  useEffect(() => {
    const fetchUnitTestFiles = async () => {
      const data = await axios.get("http://localhost:5001/list-files").then((res) => res.data);
      setFileTree(data);
    };
    fetchUnitTestFiles();
  },
    []);

  const reset = () => {
    setSelectedFiles([]);
  };

  const runTests = async () => {
    if (selectedFiles.length === 0 || loopCount <= 0) return;

    setLoading(true);
    try {
      console.log("selectedFiles", selectedFiles)
      const data = await axios.post("http://localhost:5001/start-tests", {
        files: selectedFiles,
        loopCount: loopCount,
      }).then((res) => res.data);

      console.log("data", data)
      setResults(data);
    } catch (e) {
      alert("Error running tests: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  // const pauseLoop = () => {
  //   isPausedRef.current = true;
  //   setIsPaused(true);
  // };

  // const resumeLoop = () => {
  //   isPausedRef.current = false;
  //   setIsPaused(false);
  // };

  // const stopLoop = () => {
  //   isLoopingRef.current = false;
  //   isPausedRef.current = false;
  //   setIsLooping(false);
  //   setIsPaused(false);
  // };

  const toggleFile = (filePath: string) => {
    setSelectedFiles((prev) =>
      prev.includes(filePath)
        ? prev.filter((f) => f !== filePath)
        : [...prev, filePath]
    );
  };

  return (
    <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ width: "20%", padding: "8px", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between", marginTop: 25 }}>
          <div>
            <div style={{marginBottom: 10}}><ConnectDeviceToCloudSection/></div>
            <div style={{marginBottom: 10}}><ConnectDeviceToWifiSection/></div>
          </div>

          <div style={{ marginTop: 20, marginBottom: 20, height: "100%" }}>
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

          <RunUnitTestsResultSection results={results} />
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
          {/* ▶ Start */}
          <button
            onClick={runTests}
            disabled={isLooping}
            style={{ margin: 5, borderBlockColor: "black", background: "none" }}
          >
            Start
          </button>

          {/* ⏸ Pause
            <button
              onClick={pauseLoop}
              disabled={!isLooping || isPaused}
              style={{ margin: 5, border: "none", background: "none" }}
            >
              ⏸
            </button> */}

          {/* ⏺ Resume
            <button
              onClick={resumeLoop}
              disabled={!isPaused}
              style={{ margin: 5, border: "none", background: "none" }}
            >
              ⏺
            </button> */}

          {/* ⏹ Stop
            <button
              onClick={stopLoop}
              disabled={!isLooping}
              style={{ margin: 5, border: "none", background: "none" }}
            >
              ⏹
            </button> */}

          {/* Reset ปิด loop */}
          <button
            onClick={reset}
            disabled={loading}
            style={{ margin: 5, borderBlockColor: "black", background: "none" }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
