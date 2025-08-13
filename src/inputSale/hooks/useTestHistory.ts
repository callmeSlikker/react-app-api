import { useState, useEffect } from "react";
import { RequestWithValidationResult } from "../../tests/requestWithValidation";
import { formatThaiDate } from "../../common/utilities/date";

export interface HistoryProps extends RequestWithValidationResult {
  date: string;
}

export enum HISTORY_STORAGE_KEY {
  MANUAL_HISTORIES = "manual_histories",
  AUTO_HISTORIES = "auto_histories",
}

export const useTestHistory = (STORAGE_KEY: HISTORY_STORAGE_KEY) => {
  // Initialize state directly from localStorage, parsing safely
  const [histories, setHistories] = useState<HistoryProps[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore JSON parse errors
    }
    return [];
  });

  console.log("histories", histories)

  // Sync changes back to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(histories));
  }, [histories]);

  const addHistory = (entry: RequestWithValidationResult) => {
    const nowInThai = formatThaiDate(new Date());

    const entryWithDate: HistoryProps = {
      ...entry,
      date: nowInThai,
    };

    console.log(entryWithDate);

    setHistories((prev) => [entryWithDate, ...prev]);
  };

  return {
    histories,
    addHistory,
  };
};
