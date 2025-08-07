import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import PyTestRunner from "./pages/RunUnitTestsPage/pyTestRunner";
import HomePage from "./pages/RunUnitTestsPage/HomePage";
import ManualTest from "./pages/RunUnitTestsPage/manualTest";

export default function App() {
  return (
    <React.StrictMode>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pyTestRunner" element={<PyTestRunner />} />
          <Route path="/manualTest" element={<ManualTest />} />
        </Routes>
      </HashRouter>
    </React.StrictMode>
  );
}
