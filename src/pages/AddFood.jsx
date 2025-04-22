import React, { useState } from "react";
import AxiosInstance from "../utilities/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function AddFood() {
  const userEmail = sessionStorage.getItem("userEmail");

  const [form, setForm] = useState({
    date: "",
    morning: "",
    morningCalories: "",
    morningSnack: "",
    morningSnackCalories: "",
    afternoon: "",
    afternoonCalories: "",
    eveningSnack: "",
    eveningSnackCalories: "",
    night: "",
    nightCalories: "",
    email: userEmail,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await AxiosInstance.post("/api/foods", form);
    console.log(form);
    toast.success("Food Added Successfully");
    navigate("/home");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
        🍱 Add Food Entry
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        {Object.entries(form).map(([key, value]) => (
          <div key={key}>
            <label className="block text-gray-700 font-semibold mb-1 capitalize">
              {key.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type={key === "date" ? "date" : "text"} // 👈 This line is the key
              name={key}
              value={value}
              onChange={handleChange}
              placeholder={`Enter ${key.replace(/([A-Z])/g, " $1")}`}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-200"
        >
          ➕ Submit Entry
        </button>
      </form>
    </div>
  );
}

export default AddFood;
