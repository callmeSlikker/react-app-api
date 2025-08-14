import React, { useState } from "react";
import { GenericFormFields, InputType } from "../common/form/generic/types";
import { useManualTestForm } from "./hooks/useManualTestForm";
import { useGenericForm } from "../common/form/hooks/useGenericForm";
import { ManualTestForm } from "./generic/ManualTestForm";

export enum QR_TYPES {
  QR_CREDIT = "01",
  QR_WALLET = "02",
  QR_LINEPAY = "03",
}

export default function RequestQR_Input() {
  const [formFields, setFormFields] = useState<GenericFormFields>({
    amount: {
      label: "Amount",
      key: "amount",
      value: "1.00",
      type: InputType.NUMBER,
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

  const [selectedRequestQRIndex, setSelectedRequestQRIndex] = useState(0);
  const { handleSubmitForm, response, resetResponse } = useManualTestForm();
  const name = "Request QR command";

  const handleSubmit = async () => {
    const amountValue = Number(formFields["amount"].value);

    const payload = {
      CATEGORY: "com.pax.payment.RequestQR",
      parm: {
        header: {
          formatVersion: "1",
          endPointNamespace: "com.pax.edc.bpsp",
        },
        detail: {
          amountValue,
          QRType: formFields["qrType"].value,
        },
      },
    };

    const expectedResponse = {
      "detail.QRType": formFields["qrType"].value,
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
      selectedDataTableIndex={selectedRequestQRIndex}
      setSelectedDataTableIndex={setSelectedRequestQRIndex}
      response={response}
      resetResponse={resetResponse}
      name={name}
    />
  );
}
