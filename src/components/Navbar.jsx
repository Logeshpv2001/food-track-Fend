import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    toast.success("Logout Successful");
    navigate("/");
  };
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold ">
          <Link to="/home">🍽️ Food Tracker</Link>
        </h1>
        <div className="space-x-4">
          <Link to="/home" className="hover:underline ">
            Home
          </Link>
          <Link to="/add" className="hover:underline">
            Add Food
          </Link>
          <button onClick={handleLogout}>Log out</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
