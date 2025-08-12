import React from "react";
import { GenericFormFields } from "../generic/types";

export const useGenericForm = (setFormFields: React.Dispatch<React.SetStateAction<GenericFormFields>>) => {
  const handleFormChange = (key: string, value: string | number) => {
    setFormFields((prev) => ({
      ...prev,
      [key]: { ...prev[key], value },
    }));
  };

  return handleFormChange;
};
