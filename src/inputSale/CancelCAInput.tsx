import React, { useState } from "react";
import {
  GenericFormFields,
  InputType,
} from "../common/form/generic/types";
import { useManualTestForm } from "./hooks/useManualTestForm";
import { useGenericForm } from "../common/form/hooks/useGenericForm";
import { ManualTestForm } from "./generic/ManualTestForm";

export enum QR_TYPES {
  QR_CREDIT = "01",
  QR_WALLET = "02",
  QR_LINEPAY = "03",
}

export default function CancelCA_Input() {
  const [formFields, setFormFields] = useState<GenericFormFields>({
    trace: {
      label: "Trace",
      key: "trace",
      value: "000000",
      type: InputType.TEXT,
    },
    qrType: {
      label: "QR Type",
      key: "qrType",
      value: "01",
      type: InputType.SELECT,
      options: Object.entries(QR_TYPES).map(([key, value]) => ({
        label: key,
        value: value,
      })),
    },
  });

  const [selectedCancelIndex, setSelectedCancelIndex] = useState(1);
  const { handleSubmitForm, response, resetResponse } = useManualTestForm();
  const name = "Cancel CA command";

  const handleSubmit = async () => {
    const traceStr = formFields["trace"].value;
    const invoiceTraceNumber = parseFloat(
      typeof traceStr === "string" ? traceStr : String(traceStr)
    );

    const trace = formFields["trace"].value;

    const payload = {
      CATEGORY: "com.pax.payment.CancelCommand",
      parm: {
        header: {
          formatVersion: "1",
          endPointNamespace: "com.pax.edc.bpsp",
        },
        detail: {
          invoiceTraceNumber: trace,
          QRType: formFields["qrType"].value,
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
      selectedDataTableIndex={selectedCancelIndex}
      setSelectedDataTableIndex={setSelectedCancelIndex}
      response={response}
      resetResponse={resetResponse}
      name={name}
    />
  );
}

