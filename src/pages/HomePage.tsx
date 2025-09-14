import React, { useState, useEffect } from "react";
import { ConnectDeviceToCloudSection } from "./RunUnitTestsPage/ConnectDevice/ConnectDeviceToCloudSection";
import { ConnectDeviceToWifiSection } from "./RunUnitTestsPage/ConnectDevice/ConnectDeviceToWifiSection";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/wave_backgroundImage.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        style={{
          maxWidth: "60%",
          margin: "30px auto",
          padding: "30px 24px",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          backgroundColor: "rgba(247, 249, 252, 0.85)",
          borderRadius: 12,
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.66)",
        }}
      >
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
          <div
            style={{
              marginTop: 40,
              marginBottom: 30,
              fontSize: 70,
              fontWeight: 800,
              textAlign: "center",
              color: "#284a7eff",
            }}
          >
            welcome to Tester Tool App
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 36,
              marginBottom: 0,
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
              style={{
                marginTop: 50,
                fontSize: 30,
                fontWeight: 500,
                marginBottom: 10,
                textAlign: "center",
                color: "#284a7eff",
                cursor: "default",
              }}
            >
              Select Menu
            </p>
            <div
              style={{
                marginBottom: 40,
                display: "flex",
                gap: 36,
                justifyContent: "center",
              }}
            >
              {/* Manual Test Button */}
              <button
                className="title"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 200,
                  height: 50,
                  fontSize: 18,
                  fontWeight: 200,
                  borderRadius: "8px",
                  backgroundColor: "#1853acff",
                  color: "#d2e2ffff",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.8)",
                }}
                onClick={() => navigate("/manualTest")}
              >
                Manual Test
              </button>

              {/* Auto Test Button */}
              <button
                className="title"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 200,
                  height: 50,
                  fontSize: 18,
                  fontWeight: 200,
                  borderRadius: "8px",
                  backgroundColor: "#1853acff",
                  color: "#d2e2ffff",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.8)",
                }}
                onClick={() => navigate("/pyTestRunner")}
              >
                Auto Test
              </button>

              {/* Histories Button */}
              <button
                className="title"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 200,
                  height: 50,
                  fontSize: 18,
                  fontWeight: 200,
                  borderRadius: "8px",
                  backgroundColor: "#1853acff",
                  color: "#d2e2ffff",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.8)",
                }}
                onClick={() => navigate("/histories")}
              >
                Histories
              </button>
            </div>
          </div>
        </div>

        <img
          src="/wave_backgroundImage.jpg"
          alt="background"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        />
      </div>
    </div>
  );
}
