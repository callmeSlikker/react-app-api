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

export default function Sale56_Input() {
  const [formFields, setFormFields] = useState<GenericFormFields>({
    mid: {
      label: "MID",
      key: "mid",
      value: "000002200869253",
      type: InputType.TEXT,
    },
    tid_bbl: {
      label: "TID BBL",
      key: "tid_bbl",
      value: "00000000",
      type: InputType.TEXT,
    },
    tid_unionpay: {
      label: "TID UNIONPAY",
      key: "tid_unionpay",
      value: "00000000",
      type: InputType.TEXT,
    },
    amount: {
      label: "Amount",
      key: "amount",
      value: "1.00",
      type: InputType.NUMBER,
    },
  });

  const [cards, setCards] = useState<GenericTableRow[]>([
    { D2: "VISA-CARD", D4: "04" },
    { D2: "MASTERCARD", D4: "06" },
    { D2: "JCB-CARD", D4: "02" },
    { D2: "UNIONPAY", D4: "10" },
    { D2: "DCI", D4: "12" },
    { D2: "AMEX-CARD", D4: "08" },
    { D2: "TBA", D4: "11" },
  ]);

  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const { handleSubmitForm, response, resetResponse } = useManualTestForm();
  const name = "Sale Credit 56 command";
  
  const handleSubmit = async () => {
    const card = cards[selectedCardIndex];

    const mid = formFields["mid"].value as string;
    const tid_bbl = formFields["tid_bbl"].value as string;
    const tid_unionpay = formFields["tid_unionpay"].value as string;
    const amountStr = formFields["amount"].value;
    const amountValue = parseFloat(
      typeof amountStr === "string" ? amountStr : String(amountStr)
    );

    const payload = {
      CATEGORY: "com.pax.payment.SaleCredit",
      parm: {
        header: {
          formatVersion: "1",
          endPointNamespace: "com.pax.edc.bpsp",
        },
        detail: {
          amountValue,
          mid,
          tid_bbl,
          tid_unionpay,
          D2: card.D2,
          D4: card.D4,
        },
      },
    };

    const expectedResponse = {
      "detail.merchantID": mid,
      "header.terminalID": tid_bbl || tid_unionpay,
      "detail.cardIssuerName": card.D2,
      "detail.cardIssuerID": card.D4,
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
      dataTable={cards}
      selectedDataTableIndex={selectedCardIndex}
      setSelectedDataTableIndex={setSelectedCardIndex}
      handleTableChange={useGenericFormTable(setCards)}
      response={response}
      resetResponse={resetResponse}
      name={name}
    />
  );
}
