import axios, { Method } from "axios";

function getNestedValue(obj: any, dottedKey: string): any {
  return dottedKey.split(".").reduce((acc, key) => {
    if (acc && typeof acc === "object") {
      return acc[key];
    }
    return undefined;
  }, obj);
}

export interface RequestWithValidationResult {
  function: string;
  request: any;
  response: {
    code: string | number | null | undefined;
    body: any;
    message?: string;
  };
  error?: string[] | null;
  success?: string[] | null;
}

interface ExpectMap {
  [key: string]: any;
}

export async function requestWithValidation(
  functionName: string,
  method: Method,
  url: string,
  requestBody: any,
  expect?: ExpectMap
): Promise<RequestWithValidationResult> {
  try {
    const response = await axios.request({
      method,
      url,
      data: requestBody,
      headers: { "Content-Type": "application/json" },
    });

    const jsonResponse = response.data;
    const errors: string[] = [];
    const success: string[] = [];
    let innerResponse: any = null;

    if ("response" in jsonResponse) {
      try {
        innerResponse = JSON.parse(jsonResponse["response"]);
      } catch {
        innerResponse = jsonResponse["response"];
      }

      if (expect) {
        // Handle special header.transactionDate replacement
        if (
          innerResponse?.header &&
          "transactionDate" in innerResponse.header
        ) {
          const thaiTime = new Date().toLocaleString("en-US", {
            timeZone: "Asia/Bangkok",
          });
          const dt = new Date(thaiTime);
          const yy = dt.getFullYear().toString().slice(-2);
          const mm = String(dt.getMonth() + 1).padStart(2, "0");
          const dd = String(dt.getDate()).padStart(2, "0");
          const today_yymmdd = yy + mm + dd;
          expect["header.transactionDate"] = parseInt(today_yymmdd);
        }

        for (const [key, expectedValue] of Object.entries(expect)) {
          const actualValue = getNestedValue(innerResponse, key);

          if (expectedValue === "ANY_VALUE") {
            if (actualValue == null) {
              errors.push(`Expected ${key} to exist, but it's missing or None`);
            } else {
              success.push(`Expect ${key} to be present`);
            }
          } else if (expectedValue !== actualValue) {
            errors.push(
              `Expect ${key} to be ${expectedValue}, but got ${actualValue}`
            );
          } else {
            success.push(`Expect ${key} to be ${expectedValue}`);
          }
        }
      }
    } else {
      errors.push("No response from device");
    }

    return {
      function: functionName,
      request: requestBody,
      response: {
        code: jsonResponse.resultCode,
        body: innerResponse,
        message: jsonResponse.message,
      },
      error: errors.length ? errors : null,
      success: success.length ? success : null,
    };
  } catch (e: any) {
    return {
      function: functionName,
      request: requestBody,
      response: {
        code: null,
        body: null,
        message: e.message,
      },
      error: [e.message],
    };
  }
}
