import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

export function ConnectDeviceToWifiSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [host, setHost] = useState("000.000.000.000");
  const [port, setPort] = useState(30999);
  const [connectFailed, setConnectFailed] = useState(false); // เพิ่ม state

  const connectToDevice = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:5001/connect-wifi", { host, port });
      const data = res.data;

      if (res.status === 200 && data.resultCode === "200" && data.message === "connect success") {
        setConnectFailed(false); // เชื่อมต่อสำเร็จ
        Swal.fire("Connected", "Device connected successfully", "success");
        // 👉 ที่นี่ถ้าต้องการ redirect ไปหน้าอื่นให้ใช้ navigate("/pyTestRunner")
      } else {
        setConnectFailed(true); // เชื่อมต่อไม่สำเร็จ
        Swal.fire("Failed", "Connect error", "error");
      }
    } catch (error) {
      setConnectFailed(true); // error ขณะเชื่อมต่อ
      Swal.fire("Error", "Unable to connect", "error");
    }
  };

  return (
    <div style={{ position: "relative", width: 300, fontFamily: "revert-layer" }}>
      <div style={{
        fontSize: 30,
        fontWeight: 400,
        marginBottom: 10,
        cursor: "default",
        color: "white",
        fontFamily: "inherit",
        textAlign: "center",
      }}>
        Cloud Connect
      </div>

      <div
        style={{
          marginTop: 10,
          padding: 12,
          border: "1px solid #d1d5db",
          borderRadius: 10,
          background: "#f9fafb",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <div>
          <label style={{
            fontSize: 24,
            fontWeight: 200,
            cursor: "default",
            color: "black",
            fontFamily: "inherit",
            textAlign: "center",
          }}>
            host
          </label>
          <input
            value={host}
            onChange={(e) => setHost(e.target.value)}
            style={{
              width: "100%",
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
          <label style={{
            fontSize: 24,
            fontWeight: 200,
            cursor: "default",
            color: "black",
            fontFamily: "inherit",
            textAlign: "center",
          }}>
            port
          </label>
          <input
            type="number"
            value={port}
            onChange={(e) => setPort(Number(e.target.value))}
            style={{
              width: "100%",
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
            background: connectFailed ? "#dc2626" : "#d3d7d8ff", // สีแดงถ้าล้มเหลว
            color: connectFailed ? "white" : "black",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            fontSize: 14,
            fontFamily: "inherit",
            fontWeight: 200,
            transition: "background 0.3s ease",
          }}
        >
          Connect to Device
        </button>
      </div>
    </div>
  );
}
