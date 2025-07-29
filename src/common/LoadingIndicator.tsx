// components/LoadingIndicator.tsx
import React from "react";

const LoadingIndicator: React.FC = () => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.spinner}></div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  },
  spinner: {
    width: "48px",
    height: "48px",
    border: "6px solid #e5e7eb", // light gray
    borderTop: "6px solid #6366f1", // indigo-500
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

// Keyframes via global style (CSS workaround)
const styleSheet = document.styleSheets[0];
const keyframes =
  `@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default LoadingIndicator;
