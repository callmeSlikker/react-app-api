import { GenericForm } from "../../common/form/generic/GenericForm";
import { GenericTable } from "../../common/form/generic/GenericFormTable";
import {
  GenericFormFields,
  GenericTableRow,
} from "../../common/form/generic/types";
import { RunUnitTestResult } from "../../pages/RunUnitTestsPage/RunUnitTestsResult/RunUnitTestResult";
import { RequestWithValidationResult } from "../../tests/requestWithValidation";

export const ManualTestForm = ({
  formFields,
  handleFormChange,
  handleSubmitForm,
  name,
  dataTable,
  selectedDataTableIndex,
  setSelectedDataTableIndex,
  handleTableChange,
  response,
  resetResponse,
}: {
  formFields: GenericFormFields;
  handleFormChange: (key: string, value: string | number) => void;
  handleSubmitForm: () => Promise<void>;
  name: string;
  dataTable?: GenericTableRow[];
  selectedDataTableIndex?: number;
  setSelectedDataTableIndex?: React.Dispatch<React.SetStateAction<number>>;
  handleTableChange?:
    | ((rowIndex: number, key: string, value: string) => void)
    | undefined;
  response?: RequestWithValidationResult | null;
  resetResponse: () => void;
}) => {
  return (
    <div style={{ padding: 20 }}>
      <h2>Sale Credit 56 Input</h2>
      {response ? (
        <>
          <RunUnitTestResult
            results={[
              {
                data: [response],
                fileName: name,
              },
            ]}
          />
          <div
            style={{ marginTop: 20, display: "flex", justifyContent: "end" }}
          >
            <button
              onClick={resetResponse}
              style={{
                padding: "6px 12px",
                backgroundColor: "#10b981",
                color: "white",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              Back to input
            </button>
          </div>
        </>
      ) : (
        <>
          <div style={{ display: "flex", gap: 40 }}>
            <GenericForm fields={formFields} onChange={handleFormChange} />
            {dataTable &&
              selectedDataTableIndex !== undefined &&
              setSelectedDataTableIndex &&
              handleTableChange && (
                <GenericTable
                  columns={[
                    { label: "D2", key: "D2" },
                    { label: "D4", key: "D4" },
                  ]}
                  data={dataTable}
                  selectedIndex={selectedDataTableIndex}
                  onSelect={setSelectedDataTableIndex}
                  onChange={handleTableChange}
                />
              )}
          </div>
          <div
            style={{ marginTop: 20, display: "flex", justifyContent: "end" }}
          >
            <button
              onClick={handleSubmitForm}
              style={{
                padding: "6px 12px",
                backgroundColor: "#10b981",
                color: "white",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              Send to EDC
            </button>
          </div>
        </>
      )}
    </div>
  );
};
