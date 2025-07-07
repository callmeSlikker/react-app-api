import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

export function ConnectDeviceToWifiSection() {
    const [host, setHost] = useState("192.168.137.000");
    const [port, setPort] = useState(30999);

    const connectToDevice = async () => {
        try {
            const res = await axios.post("http://127.0.0.1:5001/connect-wifi", { host, port });
            const data = res.data;

            if (res.status === 200 && data.resultCode === "200" && data.message === "connect success") {
                Swal.fire("Connected", "Device connected successfully", "success");
            } else {
                Swal.fire("Failed", "Connect error", "error");
            }
        } catch (error) {
            Swal.fire("Error", "Unable to connect", "error");
        }
    };

    return (
        <>
            <p style={{ fontFamily: "revert-layer", fontSize: 20, fontWeight: 1000, marginBottom: 10 }}>Wifi Connect</p>
            <div>
                <div style={{ display: "flex", marginBottom: 5 }}>
                    <div style={{ width: "25%" }}>
                        <label style={{ fontWeight: 600, marginBottom: 10, marginRight: 10 }}>Host :</label>
                    </div>
                    <input
                        value={host}
                        onChange={(e) => setHost(e.target.value)}
                        style={{ width: "55%", marginBottom: 8, fontFamily: "revert-layer" }}
                    />
                </div>
                <div style={{ display: "flex", marginBottom: 5 }}>
                    <div style={{ width: "25%" }}>
                        <label style={{ fontWeight: 600, marginBottom: 10, marginRight: 10 }}>Port :</label>
                    </div>
                    <input
                        type="number"
                        value={port}
                        onChange={(e) => setPort(Number(e.target.value))}
                        style={{ width: "55%", marginBottom: 8, fontFamily: "revert-layer" }}
                    />
                </div>
                <button
                    onClick={connectToDevice}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "80%",
                        marginTop: 10,
                        padding: 6,
                        background: "none",
                        color: "Black",
                        borderBlockColor: "#D2D2D2",
                        borderRadius: 4
                    }}
                >
                    Connect to Device
                </button>
            </div>

        </>
    )
}
