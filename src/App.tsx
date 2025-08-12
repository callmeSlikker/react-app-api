import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import PyTestRunner from "./pages/RunUnitTestsPage/pyTestRunner";
import HomePage from "./pages/HomePage";
import ManualTest from "./pages/ManualTestsPage/manualTest";
import HistoriesPage from "./pages/HistoriesPage/HistoriesPage";

export default function App() {
  return (
    <React.StrictMode>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pyTestRunner" element={<PyTestRunner />} />
          <Route path="/manualTest" element={<ManualTest />} />
          <Route path="/histories" element={<HistoriesPage />} />

        </Routes>
      </HashRouter>
    </React.StrictMode>
  );
}
