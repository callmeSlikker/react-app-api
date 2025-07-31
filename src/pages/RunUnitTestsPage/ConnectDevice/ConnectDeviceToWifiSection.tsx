import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

export function ConnectDeviceToWifiSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [host, setHost] = useState("000.000.000.000");
  const [port, setPort] = useState(30999);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const connectToDevice = async () => {
    try {
      const res = await axios.post("http://localhost:9092/connectDeviceByWifi", { host, port });
      const data = res.data;

      if (res.status === 200 && data.resultCode === "200" && data.message === "connect success") {
        Swal.fire("Connected", "Device connected successfully", "success");
        setStatus("success");
        setIsOpen(false); // ปิดเมนูเมื่อเชื่อมต่อสำเร็จ
      } else {
        Swal.fire("Failed", "Connect error", "error");
        setStatus("error");
      }
    } catch (error) {
      Swal.fire("Error", "Unable to connect", "error");
      setStatus("error");
    }
  };

  const getStatusIcon = () => {
    if (status === "success") return "🟢";
    if (status === "error") return "🔴";
    return "⌛";
  };

  return (
    <div style={{ position: "relative", width: 300 }}>
      {/* Clickable Text */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{ fontFamily: "revert-layer", fontSize: 20, fontWeight: 1000, cursor: "pointer" }}
      >
        Wifi Connect {getStatusIcon()}
      </div>

      {/* Dropdown Form */}
      {isOpen && (
        <div
          style={{
            marginTop: 10,
            padding: 12,
            border: "1px solid #d1d5db",
            borderRadius: 6,
            background: "#f9fafb",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ display: "flex", marginBottom: 5 }}>
            <div style={{ width: "25%" }}>
              <label style={{ fontWeight: 600, marginRight: 10 }}>host :</label>
            </div>
            <input
              value={host}
              onChange={(e) => setHost(e.target.value)}
              style={{ width: "70%", fontFamily: "revert-layer" }}
            />
          </div>
          <div style={{ display: "flex", marginBottom: 5 }}>
            <div style={{ width: "25%" }}>
              <label style={{ fontWeight: 600, marginRight: 10 }}>port :</label>
            </div>
            <input
              type="number"
              value={port}
              onChange={(e) => setPort(Number(e.target.value))}
              style={{ width: "70%", fontFamily: "revert-layer" }}
            />
          </div>
          <button
            onClick={connectToDevice}
            style={{
              width: "100%",
              marginTop: 10,
              padding: 6,
              background: "#4ade80",
              color: "black",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Connect to Device
          </button>
        </div>
      )}
    </div>
  );
}