import {
    requestWithValidation,
    RequestWithValidationResult,
} from "../../requestWithValidation";

export async function testSaleQRCJCB(
    fileName: string
): Promise<RequestWithValidationResult[]> {
    const url = "http://localhost:9092/createRequest";

    const data = {
        CATEGORY: "com.pax.payment.SaleQR",
        parm: {
            header: {
                formatVersion: "1",
                endPointNamespace: "com.pax.edc.bpsp",
            },
            detail: {
                amountValue: 2.04,
            },
        },
    };

    const expectedResponse = {
        "detail.expiredDate": "XXXX",
        "detail.cardIssuerName": "QR JCB",
        "detail.cardIssuerID": "02",
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
