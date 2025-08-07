import React, { useState } from "react";

const cardOptions = [
    { D2: "VISA-CARD", D4: "04" },
    { D2: "MASTERCARD", D4: "06" },
    { D2: "JCB-CARD", D4: "02" },
    { D2: "UNIONPAY", D4: "10" },
    { D2: "DCI", D4: "12" },
    { D2: "AMEX-CARD", D4: "08" },
    { D2: "TBA", D4: "11" },
];

type Props = {
    setResponse: React.Dispatch<React.SetStateAction<any>>;
    response?: any;
    isShowingResult: boolean;
    setIsShowingResult: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Sale56_Input({
    setResponse,
    response,
    isShowingResult,
    setIsShowingResult,
}: Props) {
    const [mid, setMid] = useState("000002200869253");
    const [tid_bbl, setTIDBBL] = useState("00000000");
    const [tid_unionpay, setTIDUNIONPAY] = useState("00000000");
    const [selectedCard, setSelectedCard] = useState({ ...cardOptions[0] });
    const [amount, setAmount] = useState("1.00");
    const [requestBody, setRequestBody] = useState<any>(null);


    const handleSubmit = async () => {
        const payload = {
            CATEGORY: "com.pax.payment.SaleCredit",
            parm: {
                header: {
                    formatVersion: "1",
                    endPointNamespace: "com.pax.edc.bpsp",
                },
                detail: {
                    amountValue: parseFloat(amount.toString()),
                    mid,
                    tid_bbl,
                    tid_unionpay,
                    D2: selectedCard.D2,
                    D4: selectedCard.D4,
                },
            },
        };

        try {
            setRequestBody(payload); // 🆕 เก็บ request ไว้แสดงผล
            const res = await fetch("http://localhost:9092/createRequest", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            let parsedResponse = data.response;
            if (typeof parsedResponse === "string") {
                try {
                    parsedResponse = JSON.parse(parsedResponse);
                } catch (error) {
                    console.error("Failed to parse response:", error);
                }
            }

            setResponse(parsedResponse);
            setIsShowingResult(true);

            setIsShowingResult(true);
        } catch (err) {
            console.error("Error sending request:", err);
        }
    };


    if (isShowingResult) {
        return (
            <div style={{ padding: 20, backgroundColor: "#ffffffff", borderRadius: 8 }}>
                <div>
                    <p
                        className="title"
                        style={{
                            color: "#000000ff",
                            backgroundColor: "#ffdd1f",
                            padding: "10px",
                            fontSize: 20,
                            fontWeight: 700,
                            width: "95%",
                        }}
                    >
                        Sale Credit 56 Input
                    </p>
                </div>
                {/* แสดงสองฝั่ง */}
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 30, marginLeft: 50, maxWidth: "80%" }}>
                    {/* ฝั่ง Request */}
                    <div style={{ flex: 1, minWidth: 200 }}>
                        <strong>Request:</strong>
                        <pre
                            style={{
                                backgroundColor: "#fff",
                                padding: 16,
                                border: "none",
                                borderRadius: 4,
                                overflowX: "auto",
                            }}
                        >
                            {JSON.stringify(
                                {
                                    CATEGORY: requestBody?.CATEGORY,
                                    parm: {
                                        header: requestBody?.parm?.header,
                                        detail: {
                                            amountValue: requestBody?.parm?.detail?.amountValue,
                                        },
                                    },
                                },
                                null,
                                2
                            )}
                        </pre>
                    </div>

                    {/* ฝั่ง Response */}
                    <div style={{ flex: 1, minWidth: 300 }}>
                        <strong>Response Body:</strong>
                        <pre style={{
                            backgroundColor: "#fff",
                            padding: 16,
                            border: "none",
                            borderRadius: 4,
                            overflowX: "auto"
                        }}>
                            {JSON.stringify(response, null, 2)}
                        </pre>
                    </div>
                </div>

                {/* ปุ่ม Back */}
                <button
                    onClick={() => setIsShowingResult(false)}
                    style={{
                        marginTop: 20,
                        padding: "6px 12px",
                        backgroundColor: "#3b82f6",
                        color: "white",
                        border: "none",
                        borderRadius: 4,
                        cursor: "pointer",
                    }}
                >
                    ◀ Back to Input
                </button>
            </div>
        );
    }
    return (
        <div>
            <div>
                <p
                    className="title"
                    style={{
                        color: "#000000ff",
                        backgroundColor: "#ffdd1f",
                        padding: "10px",
                        fontSize: 20,
                        fontWeight: 700,
                        width: "95%",
                    }}
                >
                    Sale Credit 56 Input
                </p>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "left",
                    gap: 20,
                    maxWidth: "95%",
                    marginLeft: 20,
                    marginTop: 30,
                }}
            >
                {/* Input Fields */}
                <div
                    style={{
                        padding: 20,
                        maxWidth: "50vh",
                        fontFamily: "Arial, sans-serif",
                        width: "50%",
                    }}
                >
                    <label className="title" style={{ fontSize: 16, fontWeight: 600 }}>
                        MID :
                    </label>
                    <input
                        value={mid}
                        onChange={(e) => setMid(e.target.value)}
                        style={{
                            width: "100%",
                            height: 40,
                            paddingLeft: 16,
                            marginBottom: 20,
                            marginTop: 8,
                            border: "2px solid #000000ff",
                            borderRadius: 10,
                        }}
                    />

                    <label className="title" style={{ fontSize: 16, fontWeight: 600 }}>
                        TID BBL :
                    </label>
                    <input
                        value={tid_bbl}
                        onChange={(e) => setTIDBBL(e.target.value)}
                        style={{
                            width: "100%",
                            height: 40,
                            paddingLeft: 16,
                            marginBottom: 20,
                            marginTop: 8,
                            border: "2px solid #000000ff",
                            borderRadius: 10,
                        }}
                    />

                    <label className="title" style={{ fontSize: 16, fontWeight: 600 }}>
                        TID UNIONPAY :
                    </label>
                    <input
                        value={tid_unionpay}
                        onChange={(e) => setTIDUNIONPAY(e.target.value)}
                        style={{
                            width: "100%",
                            height: 40,
                            paddingLeft: 16,
                            marginBottom: 20,
                            marginTop: 8,
                            border: "2px solid #000000ff",
                            borderRadius: 10,
                        }}
                    />

                    <div style={{ marginTop: 20 }}>
                        <label className="title" style={{ fontSize: 16, fontWeight: 600 }}>
                            Amount :
                        </label>

                        <input
                            type="text"
                            value={amount}
                            onChange={(e) => {
                                const val = e.target.value;

                                // ✅ ตรวจรูปแบบ: ตัวเลขไม่เกิน 10 หลัก + ทศนิยมไม่เกิน 2
                                const regex = /^\d{0,13}(\.\d{0,2})?$/;
                                if (regex.test(val)) {
                                    // อย่า parse float ที่นี่ เพื่อป้องกัน round
                                    setAmount(val);
                                }
                            }}
                            style={{
                                width: "100%",
                                height: 40,
                                paddingLeft: 16,
                                marginBottom: 20,
                                marginTop: 8,
                                border: "2px solid #000000ff",
                                borderRadius: 10,
                            }}
                        />
                    </div>
                </div>

                {/* ตาราง card D2/D4 */}
                <div
                    className="title"
                    style={{
                        marginLeft: 30,
                        marginTop: 30,
                        padding: 20,
                        maxWidth: "50vh",
                        fontFamily: "Arial, sans-serif",
                        width: "50%",
                    }}
                >
                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            textAlign: "center",
                            border: "2px solid #000000ff",
                        }}
                    >
                        <thead>
                            <tr
                                style={{
                                    backgroundColor: "#6e6d6dff",
                                    border: "2px solid #000000ff",
                                }}
                            >
                                <th
                                    className="title"
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 600,
                                        border: "2px solid #000000ff",
                                        color: "#ffffffff",
                                        padding: 14,
                                    }}
                                >
                                    D2
                                </th>
                                <th
                                    className="title"
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 600,
                                        border: "2px solid #000000ff",
                                        color: "#ffffffff",
                                        padding: 14,
                                    }}
                                >
                                    D4
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {cardOptions.map((card, idx) => (
                                <tr key={idx}>
                                    <td
                                        style={{
                                            border: "2px solid #000000ff",
                                            padding: 8,
                                            color: "#000000ff",
                                        }}
                                    >
                                        <input
                                            value={
                                                card.D2 === selectedCard.D2
                                                    ? selectedCard.D2
                                                    : card.D2
                                            }
                                            onChange={(e) =>
                                                setSelectedCard({
                                                    ...selectedCard,
                                                    D2: e.target.value,
                                                })
                                            }
                                            style={{
                                                width: "100%",
                                                backgroundColor: "#ffffffff",
                                                color: "#000000ff",
                                                textAlign: "center",
                                                border: "none",
                                            }}
                                        />
                                    </td>
                                    <td
                                        style={{
                                            border: "2px solid #000000ff",
                                            padding: 8,
                                            color: "#000000ff",
                                        }}
                                    >
                                        <input
                                            value={
                                                card.D2 === selectedCard.D2
                                                    ? selectedCard.D4
                                                    : card.D4
                                            }
                                            onChange={(e) =>
                                                setSelectedCard({
                                                    ...selectedCard,
                                                    D4: e.target.value,
                                                })
                                            }
                                            style={{
                                                width: "100%",
                                                backgroundColor: "#ffffffff",
                                                color: "#000000ff",
                                                textAlign: "center",
                                                border: "none",
                                            }}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "right",
                    marginBottom: "5%",
                    marginRight: "5%",
                }}
            >
                <button
                    onClick={handleSubmit}
                    style={{
                        padding: "6px 12px",
                        backgroundColor: "#10b981",
                        color: "white",
                        border: "none",
                        borderRadius: 4,
                        cursor: "pointer",
                    }}
                >
                    Send to EDC
                </button>
            </div>
        </div>
    );
}
