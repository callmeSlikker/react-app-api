import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  HistoryProps,
  HISTORY_STORAGE_KEY,
  useTestHistory,
} from "../../inputSale/hooks/useTestHistory";

const ITEMS_PER_PAGE = 5;

export default function HistoriesPage() {
  const navigate = useNavigate();

  // Track which history type is selected
  const [activeTab, setActiveTab] = useState<HISTORY_STORAGE_KEY>(
    HISTORY_STORAGE_KEY.MANUAL_HISTORIES
  );

  // Separate hooks for each history type
  const manualHistory = useTestHistory(HISTORY_STORAGE_KEY.MANUAL_HISTORIES);
  const autoHistory = useTestHistory(HISTORY_STORAGE_KEY.AUTO_HISTORIES);

  // Choose which data set to display based on tab
  const histories =
    activeTab === HISTORY_STORAGE_KEY.MANUAL_HISTORIES
      ? manualHistory.histories
      : autoHistory.histories;

  const [startDate, setStartDate] = useState(""); // YYYY-MM-DD
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleRow = (index: number) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) newSet.delete(index);
      else newSet.add(index);
      return newSet;
    });
  };

  // Filter by start and end date
  const filteredHistories = useMemo(() => {
    return histories.filter((h) => {
      const historyDate = h.date.split(" ")[0]; // assuming ISO format
      if (startDate && historyDate < startDate) return false;
      if (endDate && historyDate > endDate) return false;
      return true;
    });
  }, [histories, startDate, endDate]);

  console.log("filteredHistoriesasdf", filteredHistories)

  // Pagination
  const totalPages = Math.ceil(filteredHistories.length / ITEMS_PER_PAGE);
  const pageData = filteredHistories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const onPageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  const downloadHistoriesCSV = () => {
    if (!filteredHistories || filteredHistories.length === 0) {
      alert("No histories to export for selected date range");
      return;
    }

    let csvContent = `Date,Function,Request,Code,Response Body,Success,Error\n`;

    filteredHistories.forEach((entry) => {
      const date = entry.date;
      const func = entry.function || "";
      const request = JSON.stringify(entry.request).replace(/"/g, '""');
      const code = entry.response.code ?? "";
      const body = JSON.stringify(entry.response.body).replace(/"/g, '""');
      const success = (entry.success || []).join(" | ").replace(/"/g, '""');
      const error = (entry.error || []).join(" | ").replace(/"/g, '""');

      csvContent += `"${date}","${func}","${request}","${code}","${body}","${success}","${error}"\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      activeTab === HISTORY_STORAGE_KEY.MANUAL_HISTORIES
        ? "manual_histories.csv"
        : "auto_histories.csv"
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* Back button */}
      <button
        className="title"
        onClick={() => navigate("/")}
        style={{
          backgroundColor: "#ffffffff",
          position: "fixed",
          top: 20,
          left: 25,
          color: "#000000ff",
          fontSize: 18,
          cursor: "pointer",
          border: "1px solid #ffffffff",
        }}
      >
        ◀
      </button>

      <div
        style={{
          maxWidth: "88%",
          margin: "30px auto",
          padding: "30px 24px",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          backgroundColor: "#f7f9fc",
          borderRadius: 12,
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          color: "#333",
        }}
      >
        <div
          style={{
            fontSize: 42,
            fontWeight: 800,
            marginBottom: 10,
            textAlign: "center",
            color: "#284a7eff",
          }}
        >
          All HISTORIES
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: 20,
            margin: 20,
            justifyContent: "center",
          }}
        >
          {[
            { key: HISTORY_STORAGE_KEY.MANUAL_HISTORIES, label: "Manual" },
            { key: HISTORY_STORAGE_KEY.AUTO_HISTORIES, label: "Auto" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setCurrentPage(1);
              }}
              className="title"
              style={{
                padding: "10px 20px",
                borderRadius: 20,
                border: "3px solid #184fa3ff",
                backgroundColor:
                  activeTab === tab.key ? "#184fa3ff" : "#ffffffff",
                color: activeTab === tab.key ? "white" : "#184fa3ff",
                fontWeight: "700",
                fontSize: 16,
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Date filters */}
        <div
          style={{
            marginBottom: 30,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 12,
          }}
        >
          <label style={{ fontWeight: 700, fontSize: 16, color: "#004a99" }}>
            Start Date:
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              color: "#505050ff",
              fontSize: 14,
              padding: "6px 10px",
              borderRadius: 10,
              border: "2px solid #004a99",
              outline: "none",
            }}
          />

          <label style={{ fontWeight: 700, fontSize: 16, color: "#004a99" }}>
            End Date:
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              color: "#505050ff",
              fontSize: 14,
              padding: "6px 10px",
              borderRadius: 10,
              border: "2px solid #004a99",
              outline: "none",
            }}
          />
        </div>

        <div style={{ marginBottom: 20, textAlign: "left" }}>
          <button
            onClick={downloadHistoriesCSV}
            style={{
              backgroundColor: "#004a99",
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

        {/* History table */}
        <div
          style={{
            overflowX: "auto",
            borderRadius: 20,
            boxShadow:
              "0 12px 24px rgba(0,0,0,0.08), inset 0 0 12px rgba(0, 122, 204, 0.1)",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "separate",
              borderSpacing: 0,
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
                  background:
                    "linear-gradient(90deg, #005ec2ff 0%, #004a99 100%)",
                  color: "white",
                  fontWeight: "700",
                  fontSize: 16,
                  textAlign: "left",
                }}
              >
                {[
                  "No.",
                  "Date and Time",
                  "Function",
                  "Request",
                  "Code",
                  "Response Message",
                  "Success Messages",
                  "Error Messages",
                ].map((header) => (
                  <th
                    key={header}
                    style={{
                      padding: "16px 20px",
                      whiteSpace: "nowrap",
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
                    colSpan={8}
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
                const isExpanded = expandedRows.has(i);
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
                      cursor: "pointer",
                    }}
                    onClick={() => toggleRow(i)}
                  >
                    <td
                      style={{
                        padding: "16px",
                        textAlign: "center",
                        fontWeight: 600,
                      }}
                    >
                      {i + 1}
                    </td>
                    <td
                      style={{
                        padding: "16px",
                        textAlign: "center",
                        fontWeight: 600,
                      }}
                    >
                      {entry.date}
                    </td>
                    <td
                      style={{
                        padding: "16px",
                        fontWeight: 600,
                        color: "#004a99",
                      }}
                    >
                      {entry.function}
                    </td>
                    <td
                      style={{
                        padding: "16px",
                        fontFamily: "'Roboto Mono', monospace",
                        whiteSpace: isExpanded ? "pre-wrap" : "nowrap",
                        overflow: isExpanded ? "visible" : "hidden",
                        textOverflow: isExpanded ? "clip" : "ellipsis",
                        maxWidth: isExpanded ? "auto" : 200,
                      }}
                      title={isExpanded ? "" : JSON.stringify(entry.request)}
                    >
                      {isExpanded
                        ? JSON.stringify(entry.request, null, 2)
                        : JSON.stringify(entry.request)}
                    </td>
                    <td
                      style={{
                        padding: "16px",
                        textAlign: "center",
                        color: isSuccess ? "#238636" : "#b91c1c",
                      }}
                    >
                      {entry.response.code ?? "-"}
                    </td>
                    <td
                      style={{
                        padding: "16px",
                        fontFamily: "'Roboto Mono', monospace",
                        whiteSpace: isExpanded ? "pre-wrap" : "nowrap",
                        overflow: isExpanded ? "visible" : "hidden",
                        textOverflow: isExpanded ? "clip" : "ellipsis",
                        maxWidth: isExpanded ? "auto" : 200,
                      }}
                    >
                      {isExpanded
                        ? JSON.stringify(entry.response.body, null, 2)
                        : JSON.stringify(entry.response.body)}
                    </td>
                    <td
                      style={{
                        padding: "16px",
                        color: "#2f855a",
                        fontWeight: 600,
                      }}
                    >
                      {isExpanded
                        ? entry.success?.join("\n")
                        : entry.success?.join(" | ")}
                    </td>
                    <td
                      style={{
                        padding: "16px",
                        color: "#c53030",
                        fontWeight: 600,
                      }}
                    >
                      {isExpanded
                        ? entry.error?.join("\n")
                        : entry.error?.join(" | ")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div
          style={{
            marginTop: 30,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 18,
          }}
        >
          <button
            onClick={() => onPageChange(currentPage - 1)}
            style={{
              height: 40,
              width: 60,
              backgroundColor: "#007ACC",
              color: "white",
              border: "none",
              borderRadius: 50,
              cursor: "pointer",
            }}
          >
            Prev
          </button>
          <span>
            Page {totalPages === 0 ? 0 : currentPage} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            style={{
              height: 40,
              width: 60,
              backgroundColor: "#007ACC",
              color: "white",
              border: "none",
              borderRadius: 50,
              cursor: "pointer",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
