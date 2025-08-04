import {
    requestWithValidation,
    RequestWithValidationResult,
} from "../../requestWithValidation";

export async function testSaleCreditDCI(
    fileName: string
): Promise<RequestWithValidationResult[]> {
    const url = "http://localhost:9092/createRequest";

    const data = {
        CATEGORY: "com.pax.payment.SaleCredit",
        parm: {
            header: {
                formatVersion: "1",
                endPointNamespace: "com.pax.edc.bpsp",
            },
            detail: {
                amountValue: 1.05,
            },
        },
    };

    const expectedResponse = {
        "detail.expiredDate": "XXXX",
        "detail.cardIssuerName": "DCI",
        "detail.cardIssuerID": "12",
        "detail.merchantID": "000002200869253",
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
