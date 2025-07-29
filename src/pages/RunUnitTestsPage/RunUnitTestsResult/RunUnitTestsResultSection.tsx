import React, { Fragment, useEffect, useState } from "react";
import { RunUnitTestResult, UnitTestResult } from "./RunUnitTestResult.tsx";
import LoadingIndicator from "../../../common/LoadingIndicator.tsx";

interface RunUnitTestsResultSectionProps {
  results: UnitTestResult[][];
  inquiryResponses: Record<string, any>;
  cancelResponses: Record<string, any>;
  voidResponses: Record<string, any>;
  isRunningTets: boolean;
}

export function RunUnitTestsResultSection({
  results,
  inquiryResponses,
  cancelResponses,
  voidResponses,
  isRunningTets,
}: RunUnitTestsResultSectionProps) {
  const [openLoops, setOpenLoops] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const newOpenLoops: Record<number, boolean> = {};
    for (let i = 0; i < results.length; i++) {
      newOpenLoops[i] = true;
    }
    setOpenLoops(newOpenLoops);
  }, [results]);

  const toggleLoop = (index: number) => {
    setOpenLoops((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div
      style={{
        overflowY: "auto",
        maxHeight: "75vh",
        paddingBottom: 10,
        paddingLeft: 20,
      }}
    >
      {isRunningTets ? (
        <LoadingIndicator />
      ) : (
        <>
          {results?.map((eachLoopResults, index) => (
            <Fragment key={index}>
              {/* Clickable Loop Header */}
              <p
                onClick={() => toggleLoop(index)}
                style={{
                  fontWeight: 1000,
                  marginBottom: 10,
                  marginRight: 10,
                  fontSize: 18,
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                {openLoops[index] ? "▼" : "▶"} Loop : {index + 1}
              </p>

              {/* Show content only if opened */}
              {openLoops[index] && (
                <RunUnitTestResult
                  results={eachLoopResults}
                  inquiryResponses={inquiryResponses}
                  cancelResponses={cancelResponses}
                  voidResponses={voidResponses}
                />
              )}
            </Fragment>
          ))}
        </>
      )}
    </div>
  );
}
