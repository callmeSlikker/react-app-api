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

export default function Sale79_Input() {
  const [formFields, setFormFields] = useState<GenericFormFields>({
    mid: {
      label: "MID",
      key: "mid",
      value: "000002200869253",
      type: InputType.TEXT,
    },
    tid_linepay: {
      label: "TID LinePay",
      key: "tid_linepay",
      value: "99933468",
      type: InputType.TEXT,
    },
    amount: {
      label: "Amount",
      key: "amount",
      value: "1.00",
      type: InputType.NUMBER,
    },
  });

  const [linepay, setLinepay] = useState<GenericTableRow[]>([
    { D2: "LINEPAY", D4: "09" },
  ]);

  const [selectedLinepayIndex, setSelectedLinepayIndex] = useState(0);
  const { handleSubmitForm, response, resetResponse } = useManualTestForm();
  const name = "Sale LinePay 79 command";
  
  const handleSubmit = async () => {
    const Linepay = linepay[selectedLinepayIndex];

    const mid = formFields["mid"].value as string;
    const tid_linepay = formFields["tid_linepay"].value as string;
    const amountStr = formFields["amount"].value;
    const amountValue = parseFloat(
      typeof amountStr === "string" ? amountStr : String(amountStr)
    );

    const payload = {
      CATEGORY: "com.pax.payment.SaleLinePay",
      parm: {
        header: {
          formatVersion: "1",
          endPointNamespace: "com.pax.edc.bpsp",
        },
        detail: {
          amountValue,
          mid,
          tid_linepay,
          D2: Linepay.D2,
          D4: Linepay.D4,
        },
      },
    };

    const expectedResponse = {
      "detail.merchantID": mid,
      "header.terminalID": tid_linepay,
      "detail.cardIssuerName": Linepay.D2,
      "detail.cardIssuerID": Linepay.D4,
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
      dataTable={linepay}
      selectedDataTableIndex={selectedLinepayIndex}
      setSelectedDataTableIndex={setSelectedLinepayIndex}
      handleTableChange={useGenericFormTable(setLinepay)}
      response={response}
      resetResponse={resetResponse}
      name={name}
    />
  );
}
