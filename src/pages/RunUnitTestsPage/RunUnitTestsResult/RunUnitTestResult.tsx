import React from "react";

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
  }[];
  error?: string;
}

interface RunUnitTestsResultProps {
  results: UnitTestResult[];
}

export const RunUnitTestResult = ({ results }: RunUnitTestsResultProps) => {
  return (
    <div>
      {results?.map((test, i) => (
        <div key={i} style={{ border: `2px solid #FFBC00`,background: "#FFCA1A", borderRadius: 5, padding: 10, marginBottom: 10 }}>
          <p style={{ fontSize: 16, fontWeight: 800 }}>{test.fileName}</p>

          {test.error && (
            <div
              style={{
                color: "red",
                fontWeight: "bold",
              }}
            >
              File Error: {test.error}
            </div>
          )}

          {test?.data?.map((result, j) => {
            const hasErrors = result.error && result.error.length > 0;

            return (
              <div
                key={j}
                style={{
                  border: `2px solid ${hasErrors ? "red" : "green"}`,
                  backgroundColor: hasErrors ? "#ffffff" : "#ffffff",
                  borderRadius: 10,
                  padding: 15,
                  marginBottom: 15,
                }}
              >
                <p style={{ fontWeight: 600, marginBottom: 10, marginRight: 10 }}>
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
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
