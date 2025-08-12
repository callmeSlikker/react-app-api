import React from "react";
import { GenericTableRow } from "./types";

interface GenericTableColumn {
  label: string;
  key: string;
}

interface GenericTableProps {
  columns: GenericTableColumn[];
  data: GenericTableRow[];
  selectedIndex?: number;
  onSelect?: (index: number) => void;
  onChange?: (rowIndex: number, key: string, value: string) => void;
}

export const GenericTable: React.FC<GenericTableProps> = ({
  columns,
  data,
  selectedIndex,
  onSelect,
  onChange,
}) => {
  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              style={{
                border: "1px solid #ccc",
                padding: "8px",
                textAlign: "left",
                backgroundColor: "#f5f5f5",
              }}
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => {
          const isSelected = selectedIndex === rowIndex;
          return (
            <tr
              key={rowIndex}
              style={{
                backgroundColor: isSelected ? "#d1e7dd" : "transparent",
                cursor: onSelect ? "pointer" : "default",
              }}
              onClick={() => onSelect && onSelect(rowIndex)}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  style={{ border: "1px solid #ccc", padding: "8px" }}
                >
                  {onChange ? (
                    <input
                      type="text"
                      value={row[col.key] ?? ""}
                      onChange={(e) =>
                        onChange(rowIndex, col.key, e.target.value)
                      }
                      style={{
                        width: "100%",
                        border: "none",
                        backgroundColor: "transparent",
                        outline: "none",
                      }}
                    />
                  ) : (
                    row[col.key]
                  )}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
