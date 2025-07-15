import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

export function ConnectDeviceToCloudSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [code, setHost] = useState("00000");
  const [eid, setPort] = useState(9000041);

  const connectToDevice = async () => {
    try {
      const res = await axios.post("http://localhost:9092/connectDeviceByCloud", { code, eid });
      const data = res.data;

      if (res.status === 200 && data.resultCode === "200" && data.message === "connect success") {
        Swal.fire("Connected", "Device connected successfully", "success");
      } else {
        Swal.fire("Failed", "Connect error", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Unable to connect", "error");
    }
  };

  return (
    <div style={{ position: "relative", width: 300 }}>
      {/* Clickable Text */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{ fontFamily: "revert-layer", fontSize: 20, fontWeight: 1000}}
      >
        🌩️ Cloud Connect
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
              <label style={{ fontWeight: 600, marginRight: 10 }}>code :</label>
            </div>
            <input
              value={code}
              onChange={(e) => setHost(e.target.value)}
              style={{ width: "70%", fontFamily: "revert-layer" }}
            />
          </div>
          <div style={{ display: "flex", marginBottom: 5 }}>
            <div style={{ width: "25%" }}>
              <label style={{ fontWeight: 600, marginRight: 10 }}>eid :</label>
            </div>
            <input
              type="number"
              value={eid}
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
