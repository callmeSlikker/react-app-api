import React, { useState } from "react";
import {
  GenericFormFields,
  GenericTableRow,
  InputType,
} from "../common/form/generic/types";
import { useManualTestForm } from "./hooks/useManualTestForm";
import { useGenericForm } from "../common/form/hooks/useGenericForm";
import { useGenericFormTable } from "../common/form/hooks/useGenericFormTable";
import { ManualTestForm } from "./generic/ManualTestForm";

export default function Sale64_Input() {
  const [formFields, setFormFields] = useState<GenericFormFields>({
    mid: {
      label: "MID",
      key: "mid",
      value: "000002200869253",
      type: InputType.NUMBER,
    },
    tid_qrc: {
      label: "TID QRC",
      key: "tid_qrc",
      value: "47848651",
      type: InputType.NUMBER,
    },
    tid_promptpay: {
      label: "TID PROMPTPAY",
      key: "tid_promptpay",
      value: "47848651",
      type: InputType.NUMBER,
    },
    amount: {
      label: "Amount",
      key: "amount",
      value: "1.00",
      type: InputType.NUMBER,
    },
  });

  const [qrc, setQRC] = useState<GenericTableRow[]>([
    { D2: "PROMPTPAY", D4: "03" },
    { D2: "QR PromptP", D4: "03" },
    { D2: "QR VISA", D4: "04" },
    { D2: "QR MASTER", D4: "06" },
    { D2: "QR JCB", D4: "02" },
    { D2: "QR UnionPa", D4: "05" },
    { D2: "QR TPN", D4: "11" },
  ]);

  const [selectedQRCIndex, setSelectedQRCIndex] = useState(0);
  const { handleSubmitForm, response, resetResponse } = useManualTestForm();
  const name = "Sale QR 64 command";
  
  const handleSubmit = async () => {
    const qrcredit = qrc[selectedQRCIndex];

    const mid = formFields["mid"].value as string;
    const tid_qrc = formFields["tid_qrc"].value as string;
    const tid_promptpay = formFields["tid_promptpay"].value as string;
    const amountStr = formFields["amount"].value;
    const amountValue = parseFloat(
      typeof amountStr === "string" ? amountStr : String(amountStr)
    );

    const payload = {
      CATEGORY: "com.pax.payment.SaleQR",
      parm: {
        header: {
          formatVersion: "1",
          endPointNamespace: "com.pax.edc.bpsp",
        },
        detail: {
          amountValue,
          mid,
          tid_qrc,
          tid_promptpay,
          D2: qrcredit.D2,
          D4: qrcredit.D4,
        },
      },
    };

    const expectedResponse = {
      "detail.merchantID": mid,
      "header.terminalID": [tid_qrc, tid_promptpay],
      "detail.cardIssuerName": qrcredit.D2,
      "detail.cardIssuerID": qrcredit.D4,
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
      dataTable={qrc}
      selectedDataTableIndex={selectedQRCIndex}
      setSelectedDataTableIndex={setSelectedQRCIndex}
      handleTableChange={useGenericFormTable(setQRC)}
      response={response}
      resetResponse={resetResponse}
      name={name}
    />
  );
}
