import { useNavigate } from "react-router-dom";
import testertoolicon from "../../pic/testertoolicon.png";
import { useConnectionStore } from "../RunUnitTestsPage/ConnectDevice/store/useConnectionStore";
import { useState } from "react";
import Sale56_Input from "../../inputSale/sale56Input";
import Sale64_Input from "../../inputSale/sale64Input";
import Sale63_Input from "../../inputSale/sale63Input";
import Sale57_Input from "../../inputSale/sale57Input";
import Sale79_Input from "../../inputSale/sale79Input";
import RequestQR_Input from "../../inputSale/requestQRInput";
import Void26_Input from "../../inputSale/void26Input";
import InquityIQ_Input from "../../inputSale/InquiryIQInput";
import CancelCA_Input from "../../inputSale/CancelCAInput";

export default function ManualTest() {
    const navigate = useNavigate();
    const isCloudConnected = useConnectionStore((state) => state.isCloudConnected);
    const isWifiConnected = useConnectionStore((state) => state.isWifiConnected);
    const [selectedCommand, setSelectedCommand] = useState<string | null>(null);
    const [response, setResponse] = useState<any>(null);
    const [isShowingResult, setIsShowingResult] = useState(false);

    const commands = [
        "Sale Credit 56",
        "Sale QR 64",
        "Sale Wallet 63",
        "Sale Rabbit 57",
        "Sale Linepay 79",
        "Request QR",
        "Inquiry IQ",
        "Cancel CA",
        "Void 26",

    ];

    return (
        <div>
            {/* ปุ่ม back */}
            <button
                className="title"
                onClick={() => navigate("/")}
                style={{
                    backgroundColor: "#fff",
                    position: "fixed",
                    top: 20,
                    left: 25,
                    color: "#000",
                    fontSize: 18,
                    cursor: "pointer",
                    border: "1px solid #fff",
                }}
            >
                ◀
            </button>

            <div
                style={{
                    display: "flex",
                    justifyContent: "left",
                    gap: 50,
                    marginBottom: 0,
                    marginLeft: 50,
                    marginTop: 0,
                }}
            >
                {/* ฝั่งซ้าย */}
                <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                    <div>
                        {/* ไอคอน + สถานะ */}
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <img
                                src={testertoolicon}
                                style={{ width: 150, height: 150, objectFit: "contain" }}
                                alt="icon"
                            />
                            <div>
                                <ul
                                    style={{
                                        display: "flex",
                                        justifyContent: "left",
                                        gap: 15,
                                        margin: 0,
                                    }}
                                >
                                    {/* Cloud */}
                                    <li
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            paddingLeft: 10,
                                            paddingRight: 10,
                                            backgroundColor: "#fff",
                                            borderRadius: "20px",
                                            border: "1px solid #a1b8e6",
                                            boxShadow: "0 4px 12px rgba(98, 126, 202, 0.5)",
                                            height: 40,
                                            width: 60,
                                        }}
                                    >
                                        <p className="title" style={{ fontSize: 14, color: "black" }}>
                                            cloud
                                        </p>
                                        {isCloudConnected && (
                                            <span
                                                style={{
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: "50%",
                                                    backgroundColor: "green",
                                                    display: "inline-block",
                                                }}
                                            ></span>
                                        )}
                                    </li>

                                    {/* WiFi */}
                                    <li
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            paddingLeft: 10,
                                            paddingRight: 10,
                                            backgroundColor: "#fff",
                                            borderRadius: "20px",
                                            border: "1px solid #a1b8e6",
                                            boxShadow: "0 4px 12px rgba(98, 126, 202, 0.5)",
                                            height: 40,
                                            width: 60,
                                        }}
                                    >
                                        <p className="title" style={{ fontSize: 14, color: "black" }}>
                                            WiFi
                                        </p>
                                        {isWifiConnected && (
                                            <span
                                                style={{
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: "50%",
                                                    backgroundColor: "green",
                                                    display: "inline-block",
                                                }}
                                            ></span>
                                        )}
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* ชื่อ section */}
                        <div>
                            <p
                                className="title"
                                style={{
                                    fontSize: 20,
                                    fontWeight: 700,
                                    fontFamily: "revert-layer",
                                    marginLeft: 30,
                                    marginBottom: 10,
                                    marginTop: 0
                                }}
                            >
                                TRANSACTION COMMAND
                            </p>

                            {/* แถบปุ่มทั้งหมด */}
                            <div
                                style={{
                                    height: "auto",
                                    overflowY: "auto",
                                    marginLeft: 40,
                                    marginTop: 20,
                                    marginBottom: 0,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 12,
                                }}
                            >
                                {commands.map((cmd, index) => {
                                    const isActive = selectedCommand === cmd;

                                    return (
                                        <button
                                            key={index}
                                            className="title"
                                            onClick={() => setSelectedCommand(cmd)}
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-start",
                                                alignItems: "center",
                                                width: 250,
                                                height: 40,
                                                fontSize: 16,
                                                fontWeight: 200,
                                                borderRadius: "20px",
                                                color: "#000000",
                                                border: "none",
                                                cursor: "pointer",
                                                backgroundColor: "#eeeeeeff",
                                                transition: "all 0.2s ease-in-out",
                                                paddingLeft: 12,
                                                gap: 12,
                                            }}
                                        >
                                            {isActive && (
                                                <div
                                                    style={{
                                                        width: 25,
                                                        height: 25,
                                                        borderRadius: "50%",
                                                        backgroundColor: "#ffdd1f",
                                                        flexShrink: 0,
                                                    }}
                                                />
                                            )}
                                            <span>{cmd} command</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ฝั่งขวา INPUT DATA */}
                <div
                    style={{
                        width: "78%",
                        display: "flex",
                        flexDirection: "column",
                        marginTop: 30,
                    }}
                >
                    <p
                        className="title"
                        style={{
                            fontSize: 30,
                            fontWeight: 700,
                            fontFamily: "revert-layer",
                            marginLeft: 0,
                            marginBottom: 10,
                        }}
                    >
                        INPUT DATA
                    </p>

                    {/* input Sale Credit 56 */}
                    {selectedCommand === "Sale Credit 56" && (
                        <div style={{ marginTop: 20 }}>
                            <Sale56_Input />
                        </div>
                    )}
                    {/* input Sale QR 64 */}
                    {selectedCommand === "Sale QR 64" && (
                        <div style={{ marginTop: 20 }}>
                            <Sale64_Input />
                        </div>
                    )}
                    {/* input Sale Wallet 63 */}
                    {selectedCommand === "Sale Wallet 63" && (
                        <div style={{ marginTop: 20 }}>
                            <Sale63_Input />
                        </div>
                    )}

                    {/* input Sale Rabbit 57 */}
                    {selectedCommand === "Sale Rabbit 57" && (
                        <div style={{ marginTop: 20 }}>
                            <Sale57_Input />
                        </div>
                    )}

                    {/* input Sale Linepay 79 */}
                    {selectedCommand === "Sale Linepay 79" && (
                        <div style={{ marginTop: 20 }}>
                            <Sale79_Input />
                        </div>
                    )}

                    {/* input Request QR */}
                    {selectedCommand === "Request QR" && (
                        <div style={{ marginTop: 20 }}>
                            <RequestQR_Input />
                        </div>
                    )}

                    {/* input Induiry IQ */}
                    {selectedCommand === "Inquiry IQ" && (
                        <div style={{ marginTop: 20 }}>
                            <InquityIQ_Input />
                        </div>
                    )}

                    {/* input Cancel CA */}
                    {selectedCommand === "Cancel CA" && (
                        <div style={{ marginTop: 20 }}>
                            <CancelCA_Input />
                        </div>
                    )}

                    {/* input Void 26 */}
                    {selectedCommand === "Void 26" && (
                        <div style={{ marginTop: 20 }}>
                            <Void26_Input />
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
