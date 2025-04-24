import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import AddFood from "./pages/AddFood";
import EditFood from "./pages/EditFood";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Toaster } from "sonner";
import Cookies from "js-cookie"; // Make sure to import Cookies

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the token exists in cookies
    const token = Cookies.get("token");
    if (token) {
      // If token exists, navigate to /home
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/add" element={<AddFood />} />
        <Route path="/edit/:id" element={<EditFood />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Toaster theme="light" position="top-right" />
    </div>
  );
}

export default App;
