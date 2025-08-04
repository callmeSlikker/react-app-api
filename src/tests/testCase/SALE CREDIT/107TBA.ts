import {
    requestWithValidation,
    RequestWithValidationResult,
} from "../../requestWithValidation";

export async function testSaleCreditTBA(
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
                amountValue: 1.07,
            },
        },
    };

    const expectedResponse = {
        "detail.expiredDate": "XXXX",
        "detail.cardIssuerName": "TBA",
        "detail.cardIssuerID": "11",
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
