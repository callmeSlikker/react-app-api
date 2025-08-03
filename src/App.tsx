import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import PyTestRunner from "./pages/RunUnitTestsPage/pyTestRunner";
import HomePage from "./pages/RunUnitTestsPage/HomePage";

export default function App() {
  return (
    <>
      <React.StrictMode>
        <HashRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pyTestRunner" element={<PyTestRunner />} />
          </Routes>
        </HashRouter>
      </React.StrictMode>
    </>
  );
}
