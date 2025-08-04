export interface InquiryRequestData {
  qrType: string;
  invoiceTraceNumber: string;
}

export interface InquiryResponse {
  // กำหนดตาม response ที่ API ส่งกลับมา
  [key: string]: any;
}

export const inquiryRequest = async (
  invoiceTraceNumber: string,
  qrType: string
): Promise<InquiryResponse> => {
  try {
    const edcRequestData = {
      CATEGORY: "com.pax.payment.Inquiry",
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

    // แปลง response จาก string → object ถ้าจำเป็น
    if (typeof data.response === "string") {
      try {
        const parsed = JSON.parse(data.response);
        return parsed;
      } catch (e) {
        console.warn("Failed to parse inquiry response string", e);
      }
    }

    // ถ้าไม่ใช่ string หรือ parse ไม่ได้ ก็ส่ง data กลับตามปกติ
    return data;
  } catch (error) {
    console.error("inquiryRequest error:", error);
    throw error;
  }
};
