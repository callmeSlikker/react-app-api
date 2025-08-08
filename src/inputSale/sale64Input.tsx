import React, { useState } from "react";

const QROptions = [
    { D2: "PROMPTPAY", D4: "03" },
    { D2: "QR PromptP", D4: "03" },
    { D2: "QR VISA", D4: "04" },
    { D2: "QR MASTER", D4: "06" },
    { D2: "QR JCB", D4: "02" },
    { D2: "QR UnionPa", D4: "05" },
    { D2: "QR TPN", D4: "11" },
];

type Props = {
    setResponse: React.Dispatch<React.SetStateAction<any>>;
    response?: any;
    isShowingResult: boolean;
    setIsShowingResult: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Sale64_Input({
    setResponse,
    response,
    isShowingResult,
    setIsShowingResult,
}: Props) {
    const [mid, setMid] = useState("000002200869253");
    const [tid_qrc, setTIDQRC] = useState("00000000");
    const [tid_promptpay, setTIDPROMPTPAY] = useState("00000000");
    const [selectedQRC, setSelectedQRC] = useState({ ...QROptions[0] });
    const [amount, setAmount] = useState("1.00");
    const [requestBody, setRequestBody] = useState<any>(null);
    const [qrc, setqrc] = useState([...QROptions]);
    const [selectedQRCIndex, setSelectedQRCIndex] = useState(0);


    const handleSubmit = async () => {
        const qrc = QROptions[selectedQRCIndex];

        const payload = {
            CATEGORY: "com.pax.payment.SaleQR",
            parm: {
                header: {
                    formatVersion: "1",
                    endPointNamespace: "com.pax.edc.bpsp",
                },
                detail: {
                    amountValue: parseFloat(amount.toString()),
                    mid,
                    tid_qrc,
                    tid_promptpay,
                    D2: qrc.D2,
                    D4: qrc.D4,
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
                        TID QRC :
                    </label>
                    <input
                        value={tid_qrc}
                        onChange={(e) => setTIDQRC(e.target.value)}
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
                        TID PROMPTPAY :
                    </label>
                    <input
                        value={tid_promptpay}
                        onChange={(e) => setTIDPROMPTPAY(e.target.value)}
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

                {/* ตาราง QRC D2/D4 */}
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
                            {qrc.map((qrc, idx) => (
                                <tr
                                    key={idx}
                                    style={{
                                        backgroundColor:
                                            selectedQRCIndex === idx ? "#ffffffff" : "transparent",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => setSelectedQRCIndex(idx)}
                                >
                                    <td style={{ border: "2px solid #000", padding: 8 }}>
                                        <input
                                            value={qrc.D2}
                                            onChange={(e) => {
                                                const updated = [...QROptions];
                                                updated[idx].D2 = e.target.value;
                                                setqrc(updated);

                                                if (selectedQRCIndex === idx) {
                                                    setSelectedQRC(updated[idx]);
                                                }
                                            }}
                                            style={{
                                                width: "100%",
                                                backgroundColor: "#fff",
                                                textAlign: "center",
                                                border: "none",
                                            }}
                                        />
                                    </td>
                                    <td style={{ border: "2px solid #000", padding: 8 }}>
                                        <input
                                            value={qrc.D4}
                                            onChange={(e) => {
                                                const updated = [...QROptions];
                                                updated[idx].D4 = e.target.value;
                                                setqrc(updated);

                                                if (selectedQRCIndex === idx) {
                                                    setSelectedQRC(updated[idx]);
                                                }
                                            }}
                                            style={{
                                                width: "100%",
                                                backgroundColor: "#fff",
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
