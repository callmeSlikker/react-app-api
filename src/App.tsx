import { HashRouter as Router, Routes, Route } from "react-router-dom";
import PyTestRunner from "./pages/RunUnitTestsPage/pyTestRunner.tsx";
import "./App.css"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PyTestRunner />} />
      </Routes>
    </Router>
  );
}