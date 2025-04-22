// File: src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddFood from "./pages/AddFood";
import EditFood from "./pages/EditFood";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Toaster } from "sonner";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/add" element={<AddFood />} />
          <Route path="/edit/:id" element={<EditFood />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Toaster theme="light" position="top-right" />;
      </div>
    </Router>
  );
}

export default App;
