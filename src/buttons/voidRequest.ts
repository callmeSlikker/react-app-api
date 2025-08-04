export const voidRequest = async (invoiceTraceNumber: string) => {
  try {
    const edcRequestData = {
      CATEGORY: "com.pax.payment.Void",
      parm: {
        header: {
          formatVersion: "1",
          endPointNamespace: "com.pax.edc.bpsp",
        },
        detail: {
          invoiceTraceNumber,
        },
      },
    };

    const res = await fetch("http://localhost:9092/createRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(edcRequestData),
    });

    const rawBody = await res.json();

    // parse nested JSON if needed
    if (rawBody.response && typeof rawBody.response === "string") {
      try {
        rawBody.response = JSON.parse(rawBody.response);
      } catch (e) {
        console.warn("Failed to parse nested response JSON", e);
      }
    }

    // ✨ ตรงนี้แยกเฉพาะ response ที่เราต้องการ
    const pureResponseBody = rawBody.response ?? {};

    return {
      request: edcRequestData,
      response: {
        status: res.status,
        body: pureResponseBody,
      },
    };
  } catch (error) {
    console.error("Void request failed:", error);
    return {
      request: {
        CATEGORY: "com.pax.payment.Void",
        parm: {
          header: {
            formatVersion: "1",
            endPointNamespace: "com.pax.edc.bpsp",
          },
          detail: {
            invoiceTraceNumber,
          },
        },
      },
      response: {
        status: 500,
        body: { error: "Void request failed" },
      },
    };
  }
};
