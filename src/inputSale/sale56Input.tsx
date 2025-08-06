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

export default function Sale56Input() {
    const [mid, setMid] = useState("000002200869253");
    const [tid_bbl, setTIDBBL] = useState("00000000");
    const [tid_unionpay, setTIDUNIONPAY] = useState("00000000");
    const [selectedCard, setSelectedCard] = useState({ ...cardOptions[0] });
    const [amount, setAmount] = useState(1.01);
    const [response, setResponse] = useState<any>(null);

    const handleSubmit = async () => {
        const payload = {
            CATEGORY: "com.pax.payment.SaeleCredit",
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
            const res = await fetch("http://localhost:9092/createRequest", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            setResponse(data);
        } catch (err) {
            console.error("Error sending request:", err);
        }
    };

    return (
        <div style={{ padding: 20, maxWidth: 500, fontFamily: "Arial, sans-serif" }}>
            <h2 style={{ color: "#fff", backgroundColor: "#333", padding: "5px 10px" }}>
                Sale Input
            </h2>

            <label>MID:</label>
            <input
                value={mid}
                onChange={(e) => setMid(e.target.value)}
                style={{ width: "100%", marginBottom: 10 }}
            />

            <label>TID BBL</label>
            <input
                value={tid_bbl}
                onChange={(e) => setTIDBBL(e.target.value)}
                style={{ width: "100%", marginBottom: 10 }}
            />

            <label>TID UNIONPAY</label>
            <input
                value={tid_unionpay}
                onChange={(e) => setTIDUNIONPAY(e.target.value)}
                style={{ width: "100%", marginBottom: 10 }}
            />

            <label>Amount:</label>
            <input
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => {
                    let val = parseFloat(e.target.value);

                    // ปัดเศษทศนิยมไม่เกิน 2 ตำแหน่ง
                    if (!isNaN(val)) {
                        val = Math.floor(val * 100) / 100;
                        setAmount(val);
                    } else {
                        setAmount(0); // fallback ถ้าใส่ผิด
                    }
                }}
                style={{ width: "100%", marginBottom: 20 }}
            />

            <button onClick={handleSubmit} style={{ width: "100%", padding: 10, marginBottom: 20 }}>
                ส่งคำขอ
            </button>

            {/* ตาราง D2/D4 แก้ไขได้ */}
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    textAlign: "center",
                    backgroundColor: "#111",
                    color: "#fff",
                }}
            >
                <thead>
                    <tr style={{ backgroundColor: "#555" }}>
                        <th style={{ border: "1px solid #888", padding: 8 }}>D2</th>
                        <th style={{ border: "1px solid #888", padding: 8 }}>D4</th>
                    </tr>
                </thead>
                <tbody>
                    {cardOptions.map((card, idx) => (
                        <tr key={idx}>
                            <td style={{ border: "1px solid #888", padding: 8 }}>
                                <input
                                    value={card.D2 === selectedCard.D2 ? selectedCard.D2 : card.D2}
                                    onChange={(e) =>
                                        setSelectedCard({ ...selectedCard, D2: e.target.value })
                                    }
                                    style={{
                                        width: "100%",
                                        backgroundColor: "#111",
                                        color: "#fff",
                                        border: "none",
                                        textAlign: "center",
                                    }}
                                />
                            </td>
                            <td style={{ border: "1px solid #888", padding: 8 }}>
                                <input
                                    value={card.D2 === selectedCard.D2 ? selectedCard.D4 : card.D4}
                                    onChange={(e) =>
                                        setSelectedCard({ ...selectedCard, D4: e.target.value })
                                    }
                                    style={{
                                        width: "100%",
                                        backgroundColor: "#111",
                                        color: "#fff",
                                        border: "none",
                                        textAlign: "center",
                                    }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {response && (
                <pre style={{ marginTop: 20, background: "#f5f5f5", padding: 10 }}>
                    {JSON.stringify(response, null, 2)}
                </pre>
            )}
        </div>
    );
}
