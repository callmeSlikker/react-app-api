import axios from "axios";
import Swal from "sweetalert2";

export function Settlement() {

    const requestSettlement = async () => {
        try {
            const res = await axios.post("https://react-app-api-be.vercel.app/settlement");
            const data = res.data;

            if (res.status === 200 && data.resultCode === "200" && data.message === "connect success") {
                Swal.fire("Success", "Settlement successfully", "success");
            } else {
                Swal.fire("Failed", "Settlement fail", "error");
            }
        } catch (error) {
            Swal.fire("Error", "Unable to settlement", "error");
        }
    };

    return (
        <>
            <button
                onClick={requestSettlement}
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
                Settlement
            </button>
        </>
    )
}
