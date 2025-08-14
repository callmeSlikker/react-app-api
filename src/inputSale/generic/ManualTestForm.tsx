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
      <div style={{ backgroundColor: "#ffffffff", borderRadius: 8 }}>
        <div>
          <p
            className="title"
            style={{
              color: "#000000ff",
              backgroundColor: "#ffdd1f",
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 20,
              fontSize: 20,
              fontWeight: 700,
              width: "95%",
            }}
          >
            Input Command Data
          </p>
        </div>
      </div>
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
                marginRight: "3%",
                padding: "6px 12px",
                backgroundColor: "#ffd256ff",
                color: "white",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              ◀ Back to input
            </button>
          </div>
        </>
      ) : (
        <>
          <div style={{ display: "flex", gap: 100, maxWidth: "90%" }}>
            <div style={{ marginTop: 10, maxWidth: "50vh", fontFamily: "Arial, sans-serif", width: "50%", }}>
              <GenericForm fields={formFields} onChange={handleFormChange} />
            </div>
            <div style={{marginTop: 40 , width: "100hv" , backgroundColor: "#fff", padding: 20, borderRadius: 8}}>
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
          </div>
          <div
            style={{ marginTop: 20, display: "flex", justifyContent: "end" }}
          >
            <button
              onClick={handleSubmitForm}
              style={{
                marginRight: "3%",
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
