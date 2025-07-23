import React, { useState } from "react";
import QRCode from "react-qr-code";

export interface UnitTestResult {
  fileName: string;
  data: {
    function: string;
    request: Record<string, unknown>;
    response: {
      code: string;
      message: string;
      body: Record<string, unknown>;
    };
    error?: string[];
    success?: string[];
  }[];
  error?: string;
}

interface RunUnitTestsResultProps {
  results: UnitTestResult[];
}

export const RunUnitTestResult = ({ results }: RunUnitTestsResultProps) => {
  const [visibleQR, setVisibleQR] = useState<Record<string, boolean>>({});
  const [inquiryResponses, setInquiryResponses] = useState<Record<string, any>>(
    {}
  );

  const toggleQR = (key: string) => {
    setVisibleQR((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleInquiry = async (
    qrKey: string,
    qrType: string,
    invoiceTraceNumber: string
  ) => {
    try {
      const res = await fetch("http://localhost:5001/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          qrType,
          invoiceTraceNumber,
        }),
      });

      const data = await res.json();
      setInquiryResponses((prev) => ({
        ...prev,
        [qrKey]: data,
      }));
    } catch (err) {
      console.error("Inquiry failed", err);
      setInquiryResponses((prev) => ({
        ...prev,
        [qrKey]: { error: "Failed to fetch inquiry" },
      }));
    }
  };

  const downloadVerticalCSV = () => {
    let csvContent = "";

    results.forEach((test) => {
      test.data.forEach((result) => {
        const responseBody = result.response.body || {};
        const errorMap = (result.error || []).reduce((acc, err) => {
          const match = err.match(/Expect (.*?) to be/);
          if (match && match[1]) {
            acc[match[1]] = err;
          }
          return acc;
        }, {} as Record<string, string>);

        const successMap = (result.success || []).reduce((acc, msg) => {
          const match = msg.match(/Expect (.*?) to be/);
          if (match && match[1]) {
            acc[match[1]] = msg;
          }
          return acc;
        }, {} as Record<string, string>);

        // Header per test case
        csvContent += `[ ${test.fileName} - ${result.function} ]\n`;

        Object.entries(responseBody).forEach(([sectionName, sectionData]) => {
          if (typeof sectionData === "object" && sectionData !== null) {
            csvContent += `[ ${capitalize(sectionName)} ]\n`;
            csvContent += `key,value,status,message\n`;

            Object.entries(sectionData).forEach(([key, value]) => {
              const fullKey = `${sectionName}.${key}`;
              const val =
                typeof value === "object" && value !== null
                  ? `"${JSON.stringify(value)}"`
                  : `="${String(value)}"`;

              let status = "";
              let message = "";

              if (errorMap[fullKey]) {
                status = "error";
                message = errorMap[fullKey];
              } else if (successMap[fullKey]) {
                status = "success";
                message = successMap[fullKey];
              }

              csvContent += `${fullKey},${val},${status},"${message}"\n`;
            });

            csvContent += `\n`;
          }
        });

        csvContent += `\n`;
      });
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "formatted_vertical_result.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div>
      {/* ปุ่มดาวน์โหลด Vertical CSV (.csv) */}
      {results.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <button
            onClick={downloadVerticalCSV}
            style={{
              backgroundColor: "#4f46e5",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Result test (.csv)
          </button>
        </div>
      )}

      {/* แสดงผลแบบเดิม */}
      {results?.map((test, i) => (
        <div
          key={i}
          style={{
            border: `2px solid #FFBC00`,
            background: "#FFCA1A",
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
          }}
        >
          <p style={{ fontSize: 16, fontWeight: 800 }}>{test.fileName}</p>

          {test.error && (
            <div style={{ color: "red", fontWeight: "bold" }}>
              File Error: {test.error}
            </div>
          )}

          {test?.data?.map((result, j) => {
            const hasErrors = result.error && result.error.length > 0;
            const hasSuccess = result.success && result.success.length > 0;

            const responseBody = result.response?.body as Record<string, any>;
            const responseDetail = responseBody?.detail as
              | Record<string, any>
              | undefined;
            const qrData = responseDetail?.QRData || "";
            const qrKey = `${test.fileName}-${result.function}-${j}`;

            return (
              <div
                key={j}
                style={{
                  border: `2px solid ${hasErrors ? "red" : "green"}`,
                  backgroundColor: "#ffffff",
                  borderRadius: 10,
                  padding: 15,
                  marginBottom: 15,
                }}
              >
                <p
                  style={{ fontWeight: 600, marginBottom: 10, marginRight: 10 }}
                >
                  {result.function} {hasErrors ? "Failed" : "Passed"}
                </p>

                <div style={{ display: "flex", gap: 20, marginTop: 10 }}>
                  <div style={{ flex: 1 }}>
                    <strong style={{ fontSize: 14 }}>Request:</strong>
                    <pre
                      style={{
                        padding: 10,
                        borderRadius: 8,
                        fontSize: 14,
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {JSON.stringify(result.request, null, 2)}
                    </pre>
                  </div>

                  <div style={{ flex: 1 }}>
                    <strong style={{ fontSize: 14 }}>Response Body:</strong>
                    <pre
                      style={{
                        padding: 10,
                        borderRadius: 8,
                        fontSize: 14,
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {JSON.stringify(result.response.body, null, 2)}
                    </pre>
                  </div>
                </div>

                {qrData && (
                  <div style={{ marginTop: 10 }}>
                    <button
                      onClick={() => toggleQR(qrKey)}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "#2563eb",
                        color: "white",
                        border: "none",
                        borderRadius: 4,
                        cursor: "pointer",
                      }}
                    >
                      {visibleQR[qrKey] ? "Hide QR Code" : "Show QR Code"}
                    </button>

                    <button
                      onClick={() =>
                        handleInquiry(
                          qrKey,
                          responseDetail?.QRType,
                          responseDetail?.invoiceTraceNumber
                        )
                      }
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "#10b981",
                        color: "white",
                        border: "none",
                        borderRadius: 4,
                        cursor: "pointer",
                      }}
                    >
                      Inquiry
                    </button>

                    {visibleQR[qrKey] && (
                      <div style={{ marginTop: 10 }}>
                        <QRCode value={qrData} size={180} />
                      </div>
                    )}
                  </div>
                )}

                {hasErrors && (
                  <div style={{ fontSize: 14 }}>
                    <strong style={{ color: "#dc2626" }}>Errors:</strong>
                    <ul style={{ color: "#b91c1c", paddingLeft: 20 }}>
                      {result?.error?.map((err, k) => (
                        <li key={k}>{err}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {hasSuccess && (
                  <div style={{ fontSize: 14 }}>
                    <strong style={{ color: "#4ade80" }}>Success:</strong>
                    <ul style={{ color: "#4ade80", paddingLeft: 20 }}>
                      {result?.success?.map((err, k) => (
                        <li key={k}>{err}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
