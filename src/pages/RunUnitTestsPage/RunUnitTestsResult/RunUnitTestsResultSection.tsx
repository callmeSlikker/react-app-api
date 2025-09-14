import React, { Fragment, useEffect, useState } from "react";
import { RunUnitTestResult, UnitTestResult } from "./RunUnitTestResult";
import LoadingIndicator from "../../../common/LoadingIndicator";

interface RunUnitTestsResultSectionProps {
  results: UnitTestResult[][];
  isRunningSuccess: boolean;
}

export function RunUnitTestsResultSection({
  results,
  isRunningSuccess,
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
    <>
      {(!isRunningSuccess || !results.length) ? (
        <img
          src={"/waiting_transaction.jpg"}
          style={{ width: "85%", height: "auto", objectFit: "contain" }}
          alt="LoadTransaction"
        />
      ) : (
        <div
          style={{
            overflowY: "auto",
            maxHeight: "65vh",
            paddingBottom: 10,
            paddingLeft: 20,
          }}
        >
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
                <RunUnitTestResult results={eachLoopResults} />
              )}
            </Fragment>
          ))}
        </div>
      )}
    </>
  );
}
