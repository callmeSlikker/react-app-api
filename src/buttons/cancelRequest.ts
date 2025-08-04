export const cancelRequest = async (
  qrType: string,
  invoiceTraceNumber: string
): Promise<any> => {
  try {
    const edcRequestData = {
      CATEGORY: "com.pax.payment.CancelCommand",
      parm: {
        header: {
          formatVersion: "1",
          endPointNamespace: "com.pax.edc.bpsp",
        },
        detail: {
          QRType: qrType,
          invoiceTraceNumber: invoiceTraceNumber,
        },
      },
    };

    const response = await fetch("http://localhost:9092/createRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(edcRequestData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // ลบ key ที่ไม่ต้องการ
    delete data.error;
    delete data.function;
    delete data.success;
    delete data.resultCode;
    delete data.message;

    // ถ้า data.response เป็น JSON string ให้แปลงเป็น Object จริง
    if (typeof data.response === "string") {
      try {
        const parsedResponse = JSON.parse(data.response);
        // เอา response แทนที่ data ทั้งหมดเลย
        return parsedResponse;
      } catch (e) {
        console.warn("Failed to parse response JSON string", e);
      }
    }

    // ถ้าไม่ใช่ string หรือแปลงไม่ได้ ให้ return data ตามปกติ
    return data;
  } catch (error) {
    console.error("cancelRequest error:", error);
    throw error;
  }
};
