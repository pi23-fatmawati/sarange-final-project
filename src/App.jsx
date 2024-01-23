import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import HistoryProcess from "./components/HistoryProcess";
import HistorySuccess from "./components/HistorySuccess";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/historyprocess" element={<HistoryProcess />} />
        <Route path="/historysuccess" element={<HistorySuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
