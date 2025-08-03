import React, { useState, useEffect } from "react";
import backgroundvideo from "../../video/background2.mp4";
import { ConnectDeviceToCloudSection } from "./ConnectDevice/ConnectDeviceToCloudSection";
import { ConnectDeviceToWifiSection } from "./ConnectDevice/ConnectDeviceToWifiSection";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

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
          justifyContent: "center",
          paddingTop: 0,
          transition: "all 1s ease",
        }}
      >
        <p className="title" style={{ fontSize: 70, fontWeight: 500 }}>
          welcome to Tester Tool App
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: 'center',
            gap: 36,
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ConnectDeviceToCloudSection />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ConnectDeviceToWifiSection />
          </div>
        </div>

        <div>
          <p
            className="title"
            style={{ fontSize: 30, fontWeight: 400, marginTop: 50 }}
          >
            select testing type
          </p>
          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            {/* Manual Test Button */}
            <button
              style={{
                padding: "12px 24px",
                fontSize: "16px",
                fontWeight: 500,
                borderRadius: "8px",
                backgroundColor: "#e2e8f0",
                color: "#1a202c",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
              }}
              onClick={() => console.log("Manual Test clicked")}
            >
              Manual Test
            </button>

            {/* Auto Test Button */}
            <button
              style={{
                padding: "12px 24px",
                fontSize: "16px",
                fontWeight: 500,
                borderRadius: "8px",
                backgroundColor: "#4ade80",
                color: "white",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
              }}
              onClick={() => navigate("/pyTestRunner")}
            >
              Auto Test
            </button>
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

      <div
        style={{
          maxWidth: "1200px",
          margin: "20px auto",
          background: "rgba(0, 0, 0, 0.6)",
          padding: "20px",
          borderRadius: "20px",
          color: "white",
          fontSize: "18px",
          lineHeight: "1.6",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          textAlign: "center",
        }}
      >
        <p>
          <strong>Tester Tool App</strong>
        </p>
        <p>By Slikker</p>
      </div>
    </div>
  );
}
