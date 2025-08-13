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

export default function Sale63_Input() {
  const [formFields, setFormFields] = useState<GenericFormFields>({
    mid: {
      label: "MID",
      key: "mid",
      value: "000002200869253",
      type: InputType.NUMBER,
    },
    tid_wallet: {
      label: "TID Wallet",
      key: "tid_qrc",
      value: "48831204",
      type: InputType.NUMBER,
    },
    amount: {
      label: "Amount",
      key: "amount",
      value: "1.00",
      type: InputType.NUMBER,
    },
  });

  const [wallet, setWallet] = useState<GenericTableRow[]>([
    { D2: "WALLET", D4: "01" },
  ]);

  const [selectedWalletIndex, setSelectedWalletIndex] = useState(0);
  const { handleSubmitForm, response, resetResponse } = useManualTestForm();
  const name = "Sale Wallet 63 command";
  
  const handleSubmit = async () => {
    const Wallet = wallet[selectedWalletIndex];

    const mid = formFields["mid"].value as string;
    const tid_wallet = formFields["tid_wallet"].value as string;
    const amountStr = formFields["amount"].value;
    const amountValue = parseFloat(
      typeof amountStr === "string" ? amountStr : String(amountStr)
    );

    const payload = {
      CATEGORY: "com.pax.payment.SaleWallet",
      parm: {
        header: {
          formatVersion: "1",
          endPointNamespace: "com.pax.edc.bpsp",
        },
        detail: {
          amountValue,
          mid,
          tid_wallet,
          D2: Wallet.D2,
          D4: Wallet.D4,
        },
      },
    };

    const expectedResponse = {
      "detail.merchantID": mid,
      "header.terminalID": tid_wallet,
      "detail.cardIssuerName": Wallet.D2,
      "detail.cardIssuerID": Wallet.D4,
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
      dataTable={wallet}
      selectedDataTableIndex={selectedWalletIndex}
      setSelectedDataTableIndex={setSelectedWalletIndex}
      handleTableChange={useGenericFormTable(setWallet)}
      response={response}
      resetResponse={resetResponse}
      name={name}
    />
  );
}
