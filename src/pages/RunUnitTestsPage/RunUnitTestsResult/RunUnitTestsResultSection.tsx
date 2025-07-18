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
            <div style={{
                overflowY: "auto",
                maxHeight: "75vh",
                paddingBottom: 10,
                paddingLeft: 20,

            }}>
                {results?.map((eachLoopResults, index) => (
                    <Fragment key={index}>
                        <p style={{ fontWeight: 1000, marginBottom: 10, marginRight: 10, fontSize:18 }}>Loop : {index + 1}</p>
                        <RunUnitTestResult results={eachLoopResults} />
                    </Fragment>
                ))}
            </div >
        </>
    );
}
