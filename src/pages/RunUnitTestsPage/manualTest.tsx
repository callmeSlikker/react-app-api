import { useNavigate } from "react-router-dom";
import testertoolicon from "../../pic/testertoolicon.png";
import { useConnectionStore } from "./ConnectDevice/store/useConnectionStore";

export default function ManualTest() {
    const navigate = useNavigate();
    const isCloudConnected = useConnectionStore(
        (state) => state.isCloudConnected
    );
    const isWifiConnected = useConnectionStore((state) => state.isWifiConnected);

    return (
        <div>
            <button
                className="title"
                onClick={() => navigate("/")}
                style={{
                    backgroundColor: "#ffffffff",
                    position: "fixed",
                    top: 20,
                    left: 25,
                    color: "#000000ff",
                    fontSize: 18,
                    cursor: "pointer",
                    border: "1px solid #ffffffff",
                }}
            >
                ◀ back
            </button>
            <div
                style={{
                    display: "flex",
                    justifyContent: "left",
                    gap: 50,
                    marginBottom: 0,
                    marginLeft: 50,
                    marginTop: 40,
                }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    justifyContent: "space-between",
                    background: "rgba(255, 255, 255)",
                }}>
                    <div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            {/* ซ้าย: รูปภาพ */}
                            <img
                                src={testertoolicon}
                                style={{ width: 150, height: 150, objectFit: "contain" }}
                                alt="icon"
                            />

                            {/* ขวา: ตัวหนังสือ */}
                            <div>
                                <ul
                                    style={{
                                        display: "flex",
                                        justifyContent: "left",
                                        gap: 15,
                                        margin: 0,
                                    }}
                                >
                                    <li
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            paddingLeft: 10,
                                            paddingRight: 10,
                                            backgroundColor: "#ffffffff",
                                            borderRadius: "20px",
                                            border: "1px solid #a1b8e6ff",
                                            boxShadow: "0 4px 12px rgba(98, 126, 202, 0.5)",
                                            height: 40,
                                            width: 60,
                                        }}
                                    >
                                        <p
                                            className="title"
                                            style={{
                                                fontSize: 14,
                                                color: isCloudConnected ? "black" : "black",
                                            }}
                                        >
                                            cloud
                                        </p>
                                        {isCloudConnected ? "" : ""}
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
                                    <li
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            paddingLeft: 10,
                                            paddingRight: 10,
                                            backgroundColor: "#ffffffff",
                                            borderRadius: "20px",
                                            border: "1px solid #a1b8e6ff",
                                            boxShadow: "0 4px 12px rgba(98, 126, 202, 0.5)",
                                            height: 40,
                                            width: 60,
                                        }}
                                    >
                                        <p
                                            className="title"
                                            style={{
                                                fontSize: 14,
                                                color: isCloudConnected ? "black" : "black",
                                            }}
                                        >
                                            WiFi
                                        </p>
                                        {isWifiConnected ? "" : ""}
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

                        <div>
                            <p
                                className="title"
                                style={{
                                    fontSize: 20,
                                    fontWeight: 700,
                                    fontFamily: "revert-layer",
                                    marginLeft: 30,
                                    marginBottom: 10,
                                }}
                            >
                                TRANSECTION COMMAND
                            </p>
                            <p
                                className="title"
                                style={{
                                    fontSize: 20,
                                    fontWeight: 500,
                                    fontFamily: "revert-layer",
                                    marginLeft: 55,
                                    marginTop: 0,
                                    marginBottom: 0,
                                }}
                            >
                                select the command
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        width: "78%",
                        display: "flex",
                        flexDirection: "column",
                        marginTop: 30,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 5,
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
                    </div>
                </div>
            </div>

        </div>
    )
}