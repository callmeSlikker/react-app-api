import React, { useState } from "react";
import {
  GenericFormFields,
  InputType,
} from "../common/form/generic/types";
import { useManualTestForm } from "./hooks/useManualTestForm";
import { useGenericForm } from "../common/form/hooks/useGenericForm";
import { ManualTestForm } from "./generic/ManualTestForm";

export default function InquiryIQ_Input() {
  const [formFields, setFormFields] = useState<GenericFormFields>({
    trace: {
      label: "Trace",
      key: "trace",
      value: "000000",
      type: InputType.NUMBER,
    },
  });

  const [selectedInquiryIndex, setSelectedInquiryIndex] = useState(0);
  const { handleSubmitForm, response, resetResponse } = useManualTestForm();
  const name = "Inquiry IQ command";
  
  const handleSubmit = async () => {

    const trace = formFields["trace"].value;


    const payload = {
      CATEGORY: "com.pax.payment.Inquiry",
      parm: {
        header: {
          formatVersion: "1",
          endPointNamespace: "com.pax.edc.bpsp",
        },
        detail: {
          trace,
        },
      },
    };

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
      selectedDataTableIndex={selectedInquiryIndex}
      setSelectedDataTableIndex={setSelectedInquiryIndex}
      response={response}
      resetResponse={resetResponse}
      name={name}
    />
  );
}
