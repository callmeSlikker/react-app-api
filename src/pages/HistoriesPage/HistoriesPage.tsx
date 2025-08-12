import React, { useState, useMemo } from "react";
import {
  HistoryProps,
  useTestHistory,
} from "../../inputSale/hooks/useTestHistory";

const ITEMS_PER_PAGE = 5;

export default function HistoriesPage() {
  const { histories } = useTestHistory();

  const [searchDate, setSearchDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter by date substring (simple)
  const filteredHistories = useMemo(() => {
    if (!searchDate.trim()) return histories;
    return histories.filter((h) => h.date.includes(searchDate.trim()));
  }, [histories, searchDate]);

  // Pagination logic
  const totalPages = Math.ceil(filteredHistories.length / ITEMS_PER_PAGE);
  const pageData = filteredHistories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const onPageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  return (
    <div
      style={{
        maxWidth: "70%",
        margin: "30px auto",
        padding: "30px 24px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#f7f9fc",
        borderRadius: 12,
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        color: "#333",
      }}
    >
      <h1
        style={{
          marginBottom: 28,
          textAlign: "center",
          fontWeight: "700",
          fontSize: 28,
          color: "#004a99",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          userSelect: "none",
        }}
      >
        API Request Histories
      </h1>

      <div
        style={{
          marginBottom: 30,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 12,
        }}
      >
        <label
          htmlFor="searchDate"
          style={{
            fontWeight: 700,
            fontSize: 16,
            color: "#004a99",
            userSelect: "none",
            flexShrink: 0,
          }}
        >
          Search by Thai Date (YYYY-MM-DD):
        </label>
        <input
          id="searchDate"
          type="text"
          placeholder="e.g. 2025-08-12"
          value={searchDate}
          onChange={(e) => {
            setSearchDate(e.target.value);
            setCurrentPage(1);
          }}
          style={{
            padding: "10px 16px",
            borderRadius: 10,
            border: "2px solid #007ACC",
            fontSize: 16,
            width: 220,
            outline: "none",
            transition: "border-color 0.25s ease",
            boxShadow: "inset 0 1px 4px rgba(0,0,0,0.08)",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#005fbc")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#007ACC")}
        />
      </div>

      <div
        style={{
          overflowX: "auto",
          borderRadius: 14,
          boxShadow:
            "0 12px 24px rgba(0,0,0,0.08), inset 0 0 12px rgba(0,122,204,0.1)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: 0,
            minWidth: 720,
            backgroundColor: "white",
            borderRadius: 14,
            overflow: "hidden",
            fontSize: 14,
            userSelect: "none",
          }}
        >
          <thead>
            <tr
              style={{
                background: "linear-gradient(90deg, #007ACC 0%, #005f99 100%)",
                color: "white",
                fontWeight: "700",
                fontSize: 15,
                textAlign: "left",
                letterSpacing: "0.02em",
                userSelect: "none",
              }}
            >
              {[
                "Date (Thai Time)",
                "Function",
                "Request",
                "Response Code",
                "Success Messages",
                "Error Messages",
              ].map((header) => (
                <th
                  key={header}
                  style={{
                    padding: "16px 20px",
                    whiteSpace: "nowrap",
                    boxShadow: "inset 0 -2px 3px rgba(0,0,0,0.15)",
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  style={{
                    padding: 30,
                    textAlign: "center",
                    color: "#999",
                    fontStyle: "italic",
                  }}
                >
                  No histories found.
                </td>
              </tr>
            )}

            {pageData.map((entry: HistoryProps, i) => {
              // Safely parse code to number (if possible)
              const codeNumber =
                typeof entry.response.code === "number"
                  ? entry.response.code
                  : typeof entry.response.code === "string"
                  ? parseInt(entry.response.code, 10)
                  : NaN;

              const isSuccess =
                !isNaN(codeNumber) && codeNumber >= 200 && codeNumber < 300;

              return (
                <tr
                  key={i}
                  style={{
                    backgroundColor: i % 2 === 0 ? "#fefefe" : "#f4f8fc",
                    verticalAlign: "top",
                    transition: "background-color 0.2s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#e6f0fc")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      i % 2 === 0 ? "#fefefe" : "#f4f8fc")
                  }
                >
                  <td
                    style={{
                      padding: "16px 20px",
                      fontFamily: "'Roboto Mono', monospace",
                      whiteSpace: "nowrap",
                      color: "#1a1a1a",
                    }}
                    title={entry.date}
                  >
                    {entry.date}
                  </td>
                  <td
                    style={{
                      padding: "16px 20px",
                      fontWeight: "600",
                      color: "#004a99",
                    }}
                    title={entry.function}
                  >
                    {entry.function}
                  </td>
                  <td
                    style={{
                      padding: "16px 20px",
                      maxWidth: 300,
                      overflowX: "auto",
                      fontFamily: "'Roboto Mono', monospace",
                      fontSize: 13,
                      whiteSpace: "pre-wrap",
                      color: "#444",
                      userSelect: "text",
                      backgroundColor: "#f7f9fc",
                      borderRadius: 6,
                    }}
                    title={JSON.stringify(entry.request)}
                  >
                    {JSON.stringify(entry.request, null, 2)}
                  </td>
                  <td
                    style={{
                      padding: "16px 20px",
                      textAlign: "center",
                      fontWeight: "700",
                      color: isSuccess ? "#238636" : "#b91c1c",
                    }}
                    title={`Response code: ${entry.response.code ?? "-"}`}
                  >
                    {entry.response.code ?? "-"}
                  </td>
                  <td
                    style={{
                      padding: "16px 20px",
                      color: "#2f855a",
                      maxWidth: 250,
                      whiteSpace: "pre-wrap",
                      fontWeight: "500",
                      userSelect: "text",
                    }}
                    title={entry.success?.join("\n") ?? ""}
                  >
                    {entry.success?.join("\n") ?? "-"}
                  </td>
                  <td
                    style={{
                      padding: "16px 20px",
                      color: "#c53030",
                      maxWidth: 250,
                      whiteSpace: "pre-wrap",
                      fontWeight: "500",
                      userSelect: "text",
                    }}
                    title={entry.error?.join("\n") ?? ""}
                  >
                    {entry.error?.join("\n") ?? "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div
        style={{
          marginTop: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 18,
          fontWeight: "600",
          color: "#004a99",
          userSelect: "none",
        }}
      >
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            padding: "10px 22px",
            borderRadius: 12,
            border: "2px solid #007ACC",
            backgroundColor: currentPage === 1 ? "#cbd5e1" : "#007ACC",
            color: currentPage === 1 ? "#94a3b8" : "white",
            fontWeight: "700",
            fontSize: 15,
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
            boxShadow:
              currentPage === 1 ? "none" : "0 4px 10px rgba(0, 122, 204, 0.35)",
            transition: "all 0.3s ease",
          }}
          aria-label="Previous page"
          onMouseEnter={(e) =>
            currentPage !== 1 &&
            (e.currentTarget.style.backgroundColor = "#005f99")
          }
          onMouseLeave={(e) =>
            currentPage !== 1 &&
            (e.currentTarget.style.backgroundColor = "#007ACC")
          }
        >
          Prev
        </button>

        <span
          style={{
            fontSize: 16,
            userSelect: "none",
            minWidth: 120,
            textAlign: "center",
          }}
        >
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            padding: "10px 22px",
            borderRadius: 12,
            border: "2px solid #007ACC",
            backgroundColor: currentPage === totalPages ? "#cbd5e1" : "#007ACC",
            color: currentPage === totalPages ? "#94a3b8" : "white",
            fontWeight: "700",
            fontSize: 15,
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            boxShadow:
              currentPage === totalPages
                ? "none"
                : "0 4px 10px rgba(0, 122, 204, 0.35)",
            transition: "all 0.3s ease",
          }}
          aria-label="Next page"
          onMouseEnter={(e) =>
            currentPage !== totalPages &&
            (e.currentTarget.style.backgroundColor = "#005f99")
          }
          onMouseLeave={(e) =>
            currentPage !== totalPages &&
            (e.currentTarget.style.backgroundColor = "#007ACC")
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}
