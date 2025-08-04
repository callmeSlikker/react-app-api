import {
    requestWithValidation,
    RequestWithValidationResult,
} from "../../requestWithValidation";

export async function testRequestQR02(
    fileName: string
): Promise<RequestWithValidationResult[]> {
    const url = "http://localhost:9092/createRequest";

    const data = {
        CATEGORY: "com.pax.payment.RequestQR",
        parm: {
            header: {
                formatVersion: "1",
                endPointNamespace: "com.pax.edc.bpsp",
            },
            detail: {
                "amountValue": 1.02,
                "QRType": "02"
            },
        },
    };

    const expectedResponse = {
        "detail.QRType": "02",
        "header.responseCode": "00",
    };

    const response = await requestWithValidation(
        fileName,
        "POST",
        url,
        data,
        expectedResponse
    );

    return [response];
}
