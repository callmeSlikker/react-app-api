import React from "react";
import { GenericTableRow } from "../generic/types";

export const useGenericFormTable = (
  setTableFormFields: React.Dispatch<React.SetStateAction<GenericTableRow[]>>
) => {
  const handleTableChange = (
    index: number,
    key: keyof GenericTableRow,
    value: string
  ) => {
    setTableFormFields((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [key]: value };
      return updated;
    });
  };

  return handleTableChange;
};
