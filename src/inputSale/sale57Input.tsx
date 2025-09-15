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

export default function Sale57_Input() {
  const [formFields, setFormFields] = useState<GenericFormFields>({
    mid: {
      label: "MID",
      key: "mid",
      value: "000002200869253",
      type: InputType.TEXT,
    },
    tid_rabbit: {
      label: "TID Rabbit",
      key: "tid_rabbit",
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

  const [rabbit, setRabbit] = useState<GenericTableRow[]>([
    { D2: "RABBIT", D4: "07" },
  ]);

  const [selectedRabbitIndex, setSelectedRabbitIndex] = useState(0);
  const { handleSubmitForm, response, resetResponse } = useManualTestForm();
  const name = "Sale Rabbit 57 command";
  
  const handleSubmit = async () => {
    const Rabbit = rabbit[selectedRabbitIndex];

    const mid = formFields["mid"].value as string;
    const tid_rabbit = formFields["tid_rabbit"].value as string;
    const amountStr = formFields["amount"].value;
    const amountValue = parseFloat(
      typeof amountStr === "string" ? amountStr : String(amountStr)
    );

    const payload = {
      CATEGORY: "com.pax.payment.SaleRabbit",
      parm: {
        header: {
          formatVersion: "1",
          endPointNamespace: "com.pax.edc.bpsp",
        },
        detail: {
          amountValue,
        },
      },
    };

    const expectedResponse = {
      "detail.merchantID": mid,
      "header.terminalID": tid_rabbit,
      "detail.cardIssuerName": Rabbit.D2,
      "detail.cardIssuerID": Rabbit.D4,
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
      dataTable={rabbit}
      selectedDataTableIndex={selectedRabbitIndex}
      setSelectedDataTableIndex={setSelectedRabbitIndex}
      handleTableChange={useGenericFormTable(setRabbit)}
      response={response}
      resetResponse={resetResponse}
      name={name}
    />
  );
}
