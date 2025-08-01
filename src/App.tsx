import { HashRouter as Router, Routes, Route } from "react-router-dom";
import PyTestRunner from "./pages/RunUnitTestsPage/pyTestRunner.tsx";
import "./App.css"
import testertoolicon from "./pic/testertoolicon.png"
import React, { useState, useEffect } from "react";
import backgroundvideo from "./video/background2.mp4";
import { ConnectDeviceToCloudSection } from "./pages/RunUnitTestsPage/ConnectDevice/ConnectDeviceToCloudSection.tsx";
import { ConnectDeviceToWifiSection } from "./pages/RunUnitTestsPage/ConnectDevice/ConnectDeviceToWifiSection.tsx";

export default function App() {
  const [slideUp, setSlideUp] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setSlideUp(true), 100); // เลื่อนหลังโหลด 100ms
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          color: "white",
          textAlign: "center",
          alignItems: "center",
          justifyContent: slideUp ? "flex-start" : "center",
          paddingTop: slideUp ? "50px" : "0",
          transition: "all 1s ease",
        }}
      >
        <p className="title" style={{ fontSize: 70, fontWeight: 500 }}>
          welcome to Tester Tool App
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "100px",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 20px", // เผื่อจอแคบ กันเนื้อหาชิดขอบ
          }}
        >
          {/* ใส่ wrapper div ถ้าจะควบคุมขนาด child ให้ชัวร์ */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ConnectDeviceToCloudSection />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ConnectDeviceToWifiSection />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ConnectDeviceToCloudSection />
          </div>
        </div>
      </div>


      <div className="video-background">
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <source src={backgroundvideo} type="video/mp4" />
        </video>
      </div>

    </div>
  );
}
