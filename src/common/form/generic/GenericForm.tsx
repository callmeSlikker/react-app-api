import React from "react";
import { GenericFormField, InputType } from "./types";

interface Props {
  fields: Record<string, GenericFormField>;
  onChange: (key: string, value: string | number) => void;
}

export const GenericForm: React.FC<Props> = ({ fields, onChange }) => {
  return (
    <div style={{ padding: 20, minWidth: "25%" }}>
      {Object.entries(fields).map(([key, config]) => (
        <div key={key} style={{ marginBottom: 20 }}>
          <label style={{ fontWeight: 600, display: "block", marginBottom: 8 }}>
            {config.label}:
          </label>

          {config.type === InputType.SELECT ? (
            <select
              value={config.value ?? ""}
              onChange={(e) => onChange(key, e.target.value)}
              style={{
                width: "100%",
                height: 40,
                paddingLeft: 16,
                border: "2px solid #000",
                borderRadius: 10,
              }}
            >
              {config.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={config.type}
              value={config.value ?? ""}
              onChange={(e) =>
                onChange(
                  key,
                  config.type === InputType.NUMBER
                    ? Number(e.target.value)
                    : e.target.value
                )
              }
              style={{
                width: "100%",
                height: 40,
                paddingLeft: 16,
                border: "2px solid #000",
                borderRadius: 10,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};
