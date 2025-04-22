import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AxiosInstance from "../utilities/AxiosInstance";
import { toast } from "sonner";

function EditFood() {
  const [form, setForm] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    AxiosInstance.get(`/api/foods/${id}`).then((res) => setForm(res.data));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await AxiosInstance.put(`/api/foods/${id}`, form);
    toast.success("Edited Successfully");
    navigate("/");
  };

  if (!form) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
        ✏️ Edit Food Entry
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
              name={key}
              value={value}
              onChange={handleChange}
              placeholder={`Update ${key.replace(/([A-Z])/g, " $1")}`}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition duration-200"
        >
          ✅ Update Entry
        </button>
      </form>
    </div>
  );
}

export default EditFood;
