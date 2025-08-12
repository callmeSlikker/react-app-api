import { useState } from "react";
import {
  requestWithValidation,
  RequestWithValidationResult,
} from "../../tests/requestWithValidation";
import { Method } from "axios";
import { useTestHistory } from "./useTestHistory";

export const useManualTestForm = () => {
  const [response, setResponse] = useState<RequestWithValidationResult | null>(
    null
  );
  const { addHistory } = useTestHistory();

  const handleSubmitForm = async (
    name: string,
    method: Method,
    url: string,
    data: Record<string, unknown>,
    expect: Record<string, unknown>
  ) => {
    try {
      const response = await requestWithValidation(
        name,
        method,
        url,
        data,
        expect
      );

      addHistory(response);
      setResponse(response);
    } catch (err) {
      console.error("Error sending request:", err);
    }
  };

  const resetResponse = () => {
    setResponse(null);
  };

  return {
    response,
    resetResponse,
    handleSubmitForm,
  };
};
