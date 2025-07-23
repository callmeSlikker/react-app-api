import React, { useEffect, useState } from "react";
import axios from "axios";

interface UnitTestResult {
    fileName: string;
    data: {
        function: string;
        request: Record<string, unknown>;
        response: {
            code: string;
            message: string;
            body: Record<string, unknown>;
        };
        error?: string[];
        success?: string[];
    }[];
    error?: string;
}

const RunUnitTestTable: React.FC = () => {
    const [results, setResults] = useState<UnitTestResult[]>([]);

    useEffect(() => {
        axios
            .post("http://localhost:5001/start-tests", {
                files: ["test_example.py"], // ✅ เปลี่ยนชื่อไฟล์ที่ต้องการรัน
                loopCount: 1,
            })
            .then((res) => {
                setResults(res.data);
            })
            .catch((err) => {
                console.error("API error:", err);
            });
    }, []);

    return (
        <div>

            <table className="table-auto border w-full text-left">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2">Function</th>
                        <th className="border px-4 py-2">Request</th>
                        <th className="border px-4 py-2">Response</th>
                        <th className="border px-4 py-2 text-red-600">Errors</th>
                        <th className="border px-4 py-2 text-green-600">Success</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((test, i) =>
                        (test.data ?? []).map((result, j) => (
                            <tr key={`${i}-${j}`}>
                                <td className="border px-4 py-2 font-semibold">
                                    {result.function}
                                </td>
                                <td className="border px-4 py-2 whitespace-pre-wrap text-sm">
                                    {JSON.stringify(result.request, null, 2)}
                                </td>
                                <td className="border px-4 py-2 whitespace-pre-wrap text-sm">
                                    {JSON.stringify(result.response.body, null, 2)}
                                </td>
                                <td className="border px-4 py-2 text-sm text-red-600">
                                    {result.error?.length
                                        ? result.error.join("\n")
                                        : "No errors"}
                                </td>
                                <td className="border px-4 py-2 text-sm text-green-600">
                                    {result.success?.length
                                        ? result.success.join("\n")
                                        : "No success"}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default RunUnitTestTable;
