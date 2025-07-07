import React, { Fragment } from "react";

import { RunUnitTestResult, UnitTestResult } from "./RunUnitTestResult.tsx";

interface RunUnitTestsResultSectionProps {
    results: UnitTestResult[][];
}

export function RunUnitTestsResultSection({
    results,
}: RunUnitTestsResultSectionProps) {
    return (
        <>
            <p
                style={{
                    fontSize: 18,
                    fontWeight: 700,
                    marginBottom: 10,
                    marginTop: 0,
                }}
            >
                Request + Response
            </p>
            <div style={{
                overflowY: "auto",
                maxHeight: "75vh"
            }}>
                {results?.map((eachLoopResults, index) => (
                    <Fragment key={index}>
                        <p style={{ fontWeight: 600, marginBottom: 10, marginRight: 10 }}>Loop : {index + 1}</p>
                        <RunUnitTestResult results={eachLoopResults} />
                    </Fragment>
                ))}
            </div>
        </>
    );
}
