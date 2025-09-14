import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { useConnectionStore } from "./store/useConnectionStore";

export function ConnectDeviceToCloudSection() {
  const setCloudConnected = useConnectionStore(
    (state) => state.setCloudConnected
  );
  const [code, setCode] = useState("00000");
  const [eid, setEid] = useState(9000041);
  const [appId, setAppID] = useState(9000041);
  const [connectSuccess, setConnectSuccess] = useState(false);
  const [connectFailed, setConnectFailed] = useState(false);

  const connectToDevice = async () => {
    try {
      const res = await axios.post(
        "http://localhost:9092/connectDeviceByCloud",
        { code, eid }
      );
      const data = res.data;

      if (
        res.status === 200 &&
        data.resultCode === "200" &&
        data.message === "connect success"
      ) {
        setConnectSuccess(true);
        setConnectFailed(false);
        setCloudConnected(true); // ✅ อัปเดต global state
        Swal.fire("Connected", "Device connected successfully", "success");
      } else {
        setConnectSuccess(false);
        setConnectFailed(true);
        setCloudConnected(false); // ❌ กรณีล้มเหลว
        Swal.fire("Failed", "Connect error", "error");
      }
    } catch (error) {
      setConnectSuccess(false);
      setConnectFailed(true);
      setCloudConnected(false);
      Swal.fire("Error", "Unable to connect", "error");
    }
  };

  return (
    <div
      style={{ position: "relative", width: 300, fontFamily: "revert-layer" }}
    >
      <div
        style={{
          fontSize: 30,
          fontWeight: 500,
          marginBottom: 10,
          textAlign: "center",
          color: "#284a7eff",
          cursor: "default",
        }}
      >
        Cloud Connect
      </div>

      <div
        style={{
          marginTop: 10,
          padding: 12,
          border: "1px solid #d1d5db",
          borderRadius: 10,
          background: "#f9fafb",
          boxShadow: "0 2px 8px rgba(0, 44, 94, 0.66)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <div>
          <label style={{ fontSize: 24, fontWeight: 200, color: "black" }}>
            code
          </label>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{
              width: "250px",
              marginTop: 4,
              padding: "8px 10px",
              fontSize: 16,
              fontFamily: "inherit",
              fontWeight: 100,
              boxSizing: "border-box",
              borderRadius: 4,
              border: "1px solid #ccc",
              textAlign: "center",
            }}
          />
        </div>

        <div>
          <label style={{ fontSize: 24, fontWeight: 200, color: "black" }}>
            eid
          </label>
          <input
            type="number"
            value={eid}
            onChange={(e) => setEid(Number(e.target.value))}
            style={{
              width: "250px",
              marginTop: 4,
              padding: "8px 10px",
              fontSize: 16,
              fontFamily: "inherit",
              fontWeight: 100,
              boxSizing: "border-box",
              borderRadius: 4,
              border: "1px solid #ccc",
              textAlign: "center",
            }}
          />
        </div>

        <div>
          <label style={{ fontSize: 24, fontWeight: 200, color: "black" }}>
            appId
          </label>
          <input
            type="number"
            value={appId}
            onChange={(e) => setAppID(Number(e.target.value))}
            style={{
              width: "250px",
              marginTop: 4,
              padding: "8px 10px",
              fontSize: 16,
              fontFamily: "inherit",
              fontWeight: 100,
              boxSizing: "border-box",
              borderRadius: 4,
              border: "1px solid #ccc",
              textAlign: "center",
            }}
          />
        </div>

        <button
          onClick={connectToDevice}
          style={{
            width: "100%",
            padding: 10,
            background: connectSuccess
              ? "#16a34a" // เขียวสำเร็จ
              : connectFailed
              ? "#dc2626" // แดงล้มเหลว
              : "#d3d7d8ff", // สีเริ่มต้น
            color: connectSuccess || connectFailed ? "white" : "black",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            fontSize: 14,
            fontFamily: "inherit",
            fontWeight: 200,
            transition: "background 0.3s ease",
          }}
        >
          {connectSuccess
            ? "Connected"
            : connectFailed
            ? "Connect Failed"
            : "Connect to Device"}
        </button>
      </div>
    </div>
  );
}
