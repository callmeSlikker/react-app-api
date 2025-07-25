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
  inquiryResponses: Record<string, any>;
  cancelResponses: Record<string, any>;
  voidResponses: Record<string, any>;
}


export const RunUnitTestResult = ({ results }: RunUnitTestsResultProps) => {
  const [visibleQR, setVisibleQR] = useState<Record<string, boolean>>({});
  const [inquiryResponses, setInquiryResponses] = useState<Record<string, any>>({});
  const [cancelResponses, setCancelResponses] = useState<Record<string, any>>({});
  const [voidResponses, setVoidResponses] = useState<Record<string, any>>({});
  const [caseKey, setCaseKey] = useState<string>("");

  const [expandedFiles, setExpandedFiles] = useState<Record<string, boolean>>({});

  const toggleExpandFile = (fileName: string) => {
    setExpandedFiles((prev) => ({
      ...prev,
      [fileName]: !prev[fileName],
    }));
  };
  const handleVoid = async (
    qrKey: string,
    invoiceTraceNumber: string
  ) => {
    try {
      if (!invoiceTraceNumber) {
        console.warn("Missing invoiceTraceNumber for void.");
        return;
      }

      const res = await fetch("http://localhost:5001/void", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ invoiceTraceNumber }),
      });

      const data = await res.json();

      setVoidResponses((prev) => ({
        ...prev,
        [qrKey]: data,
      }));
    } catch (err) {
      console.error("Void failed", err);
      setVoidResponses((prev) => ({
        ...prev,
        [qrKey]: { error: "Failed to fetch void" },
      }));
    }
  };


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


  const handleCancle = async (
    qrKey: string,
    qrType: string,
    invoiceTraceNumber: string
  ) => {
    try {
      const res = await fetch("http://localhost:5001/cancle", {
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
      setCancelResponses((prev) => ({
        ...prev,
        [qrKey]: data,
      }));
    } catch (err) {
      console.error("Cancel failed", err);
      setCancelResponses((prev) => ({
        ...prev,
        [qrKey]: { error: "Failed to fetch cancel" },
      }));
    }
  };


  const downloadVerticalCSV = () => {
    let csvContent = "";

    // === Step 1: Create summaryContent first ===
    let summaryContent = `=== Summary ===\n`;
    summaryContent += `File Name,Result\n`;

    results.forEach((test) => {
      let hasError = false;

      test.data.forEach((result) => {
        if (result.error && result.error.length > 0) {
          hasError = true;
        }
      });

      summaryContent += `${test.fileName},${hasError ? "error" : "success"}\n`;
    });

    summaryContent += `\n`; // For spacing before detailed content

    // === Step 2: Append detailed content to csvContent ===
    results.forEach((test) => {
      test.data.forEach((result, index) => {
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

        const qrKey = `${test.fileName}-${result.function}-${index}`;

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
                  : typeof value === "number"
                    ? `'${value}`
                    : /^\d+$/.test(value)
                      ? `'${value}`
                      : `${value}`;

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

        const inquiry = inquiryResponses[qrKey];
        if (inquiry?.response?.body) {
          csvContent += `[ ${test.fileName} - ${result.function} - Inquiry ]\n`;

          Object.entries(inquiry.response.body).forEach(([sectionName, sectionData]) => {
            if (typeof sectionData === "object" && sectionData !== null) {
              csvContent += `[ ${capitalize(sectionName)} ]\n`;
              csvContent += `key,value\n`;

              Object.entries(sectionData).forEach(([key, value]) => {
                const val =
                  typeof value === "object" && value !== null
                    ? `"${JSON.stringify(value)}"`
                    : `="${String(value)}"`;
                csvContent += `${sectionName}.${key},${val}\n`;
              });

              csvContent += `\n`;
            }
          });
        }

        const cancel = cancelResponses[qrKey];
        if (cancel?.response?.body) {
          csvContent += `[ ${test.fileName} - ${result.function} - Cancel ]\n`;

          Object.entries(cancel.response.body).forEach(([sectionName, sectionData]) => {
            if (typeof sectionData === "object" && sectionData !== null) {
              csvContent += `[ ${capitalize(sectionName)} ]\n`;
              csvContent += `key,value\n`;

              Object.entries(sectionData).forEach(([key, value]) => {
                const val =
                  typeof value === "object" && value !== null
                    ? `"${JSON.stringify(value)}"`
                    : `="${String(value)}"`;
                csvContent += `${sectionName}.${key},${val}\n`;
              });

              csvContent += `\n`;
            }
          });
        }

        const voidRes = voidResponses[qrKey];
        if (voidRes?.response?.body) {
          csvContent += `[ ${test.fileName} - ${result.function} - Void ]\n`;

          Object.entries(voidRes.response.body).forEach(([sectionName, sectionData]) => {
            if (typeof sectionData === "object" && sectionData !== null) {
              csvContent += `[ ${capitalize(sectionName)} ]\n`;
              csvContent += `key,value\n`;

              Object.entries(sectionData).forEach(([key, value]) => {
                const val =
                  typeof value === "object" && value !== null
                    ? `"${JSON.stringify(value)}"`
                    : `="${String(value)}"`;
                csvContent += `${sectionName}.${key},${val}\n`;
              });

              csvContent += `\n`;
            }
          });
        }

        csvContent += `\n`;
      });
    });

    // === Step 3: Combine summary and full content ===
    const finalContent = summaryContent + csvContent;

    const blob = new Blob([finalContent], { type: "text/csv;charset=utf-8;" });
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
                  backgroundColor: hasErrors
                    ? "#ffcfcf"   // สีแดงอ่อนเวลาผิด
                    : hasSuccess
                      ? "#e1fae5"   // สีเขียวอ่อนเวลาผ่าน
                      : "#ffffff",  // สีขาวถ้าไม่มีทั้ง error และ success
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
                        marginLeft: 10,
                      }}
                    >
                      Inquiry
                    </button>

                    <button
                      onClick={() =>
                        handleCancle(
                          qrKey,
                          responseDetail?.QRType,
                          responseDetail?.invoiceTraceNumber
                        )
                      }
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "#f97316",
                        color: "white",
                        border: "none",
                        borderRadius: 4,
                        cursor: "pointer",
                        marginLeft: 10,
                      }}
                    >
                      Cancel
                    </button>

                    {visibleQR[qrKey] && (
                      <div style={{ marginTop: 10 }}>
                        <QRCode value={qrData} size={180} />
                      </div>
                    )}
                  </div>
                )}


                {inquiryResponses[qrKey] && (
                  <div style={{ marginTop: 10 }}>
                    <strong>Inquiry Result:</strong>
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
                          {JSON.stringify(inquiryResponses[qrKey]?.request, null, 2)}
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
                          {JSON.stringify(inquiryResponses[qrKey]?.response?.body, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}

                {cancelResponses[qrKey] && (
                  <div style={{ marginTop: 10 }}>
                    <strong>Cancel Result:</strong>
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
                          {JSON.stringify(cancelResponses[qrKey]?.request, null, 2)}
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
                          {JSON.stringify(cancelResponses[qrKey]?.response?.body, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={() =>
                    handleVoid(
                      qrKey,
                      responseDetail?.invoiceTraceNumber
                    )
                  }
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "#a855f7",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                    marginLeft: 10,
                  }}
                >
                  Void
                </button>


                {voidResponses[qrKey] && (
                  <div style={{ marginTop: 10 }}>
                    <strong>Void Result:</strong>
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
                          {JSON.stringify(voidResponses[qrKey]?.request, null, 2)}
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
                          {JSON.stringify(voidResponses[qrKey]?.response?.body, null, 2)}
                        </pre>
                      </div>
                    </div>
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
