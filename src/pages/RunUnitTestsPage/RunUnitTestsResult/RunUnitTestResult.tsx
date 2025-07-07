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
    <div
      style={{
        padding: 20,
        border: "1px solid #ccc",
        borderRadius: 10,
        background: "#f9fafb",
      }}
    >
      {results?.map((test, i) => (
        <div key={i} style={{ marginBottom: 30 }}>
          <p style={{ fontWeight: 600, marginBottom: 10, marginRight: 10 }}>{test.fileName}</p>

          {test.error && (
            <div
              style={{
                color: "red",
                fontWeight: "bold",
                marginBottom: 10,
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
                  border: `2px solid ${hasErrors ? "#dc2626" : "#16a34a"}`,
                  backgroundColor: hasErrors ? "#fee2e2" : "#d1fae5",
                  borderRadius: 10,
                  padding: 15,
                  marginBottom: 15,
                }}
              >
                <p style={{ fontWeight: 600, marginBottom: 10, marginRight: 10 }}>
                  {result.function} {hasErrors ? "Failed" : "Passed"}
                </p>

                <div style={{ marginTop: 10 }}>
                  <strong>Request:</strong>
                  <pre
                    style={{
                      background: "#f3f4f6",
                      padding: 10,
                      borderRadius: 8,
                      fontSize: 14,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {JSON.stringify(result.request, null, 2)}
                  </pre>
                </div>

                <div style={{ marginTop: 10 }}>
                  <strong>Response Body:</strong>
                  <pre
                    style={{
                      background: "#f3f4f6",
                      padding: 10,
                      borderRadius: 8,
                      fontSize: 14,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {JSON.stringify(result.response.body, null, 2)}
                  </pre>
                </div>

                {hasErrors && (
                  <div style={{ marginTop: 10 }}>
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
