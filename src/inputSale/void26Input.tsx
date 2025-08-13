import React, { useState } from "react";
import {
  GenericFormFields,
  InputType,
} from "../common/form/generic/types";
import { useManualTestForm } from "./hooks/useManualTestForm";
import { useGenericForm } from "../common/form/hooks/useGenericForm";
import { ManualTestForm } from "./generic/ManualTestForm";

export default function Void26_Input() {
  const [formFields, setFormFields] = useState<GenericFormFields>({
    trace: {
      label: "Trace",
      key: "trace",
      value: "000000",
      type: InputType.NUMBER,
    },
  });

  const [selectedVoidIndex, setSelectedVoidIndex] = useState(0);
  const { handleSubmitForm, response, resetResponse } = useManualTestForm();
  const name = "Void 26 command";

  const handleSubmit = async () => {
    const traceStr = formFields["trace"].value;
    const traceValue = parseFloat(
      typeof traceStr === "string" ? traceStr : String(traceStr)
    );

    const trace = formFields["trace"].value;

    const payload = {
      CATEGORY: "com.pax.payment.Void",
      parm: {
        header: {
          formatVersion: "1",
          endPointNamespace: "com.pax.edc.bpsp",
        },
        detail: {
          trace,
        },
      },
    }


    const expectedResponse = {
      "detail.invoiceTraceNumber": trace,
    };

    const method = "POST";
    const url = "http://localhost:9092/createRequest";
    const data = payload;
    const expect = expectedResponse;

    try {
      await handleSubmitForm(name, method, url, data, expect);
    } catch (error) {
      console.error("Error submitting form:", error);
    }

  };

  return (
    <ManualTestForm
      formFields={formFields}
      handleFormChange={useGenericForm(setFormFields)}
      handleSubmitForm={handleSubmit}
      selectedDataTableIndex={selectedVoidIndex}
      setSelectedDataTableIndex={setSelectedVoidIndex}
      response={response}
      resetResponse={resetResponse}
      name={name}
    />
  );
}
