// File: src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddFood from "./pages/AddFood";
import EditFood from "./pages/EditFood";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddFood />} />
          <Route path="/edit/:id" element={<EditFood />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
