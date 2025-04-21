import React, { useEffect, useState } from "react";
import AxiosInstance from "../utilities/AxiosInstance";
import { Link } from "react-router-dom";

function Home() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFoods = async () => {
    try {
      const res = await AxiosInstance.get("/api/foods");
      const data = Array.isArray(res.data) ? res.data : [];
      setFoods(data);
    } catch (error) {
      console.error("Error fetching food data:", error);
      setFoods([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteFood = async (id) => {
    try {
      await AxiosInstance.delete(`/api/foods/${id}`);
      fetchFoods();
    } catch (error) {
      console.error("Error deleting food entry:", error);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  if (loading) return <div className="p-6 text-lg">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-white to-blue-200 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-8 animate-fade-in">
          🍱 Tracked Food Entries
        </h2>

        {foods.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No food entries found. Start tracking your meals today!
          </p>
        ) : (
          <div className="grid gap-6">
            {foods.map((food) => (
              <div
                key={food._id}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center"
              >
                <div className="space-y-1 text-sm text-gray-700">
                  <p>
                    <strong>Date:</strong> {food.date}
                  </p>
                  <p>
                    <strong>Morning:</strong> {food.morning} (
                    {food.morningCalories} cal)
                  </p>
                  <p>
                    <strong>Morning Snacks:</strong> {food.morningSnack} (
                    {food.morningSnackCalories} cal)
                  </p>
                  <p>
                    <strong>Afternoon:</strong> {food.afternoon} (
                    {food.afternoonCalories} cal)
                  </p>
                  <p>
                    <strong>Evening Snacks:</strong> {food.eveningSnack} (
                    {food.eveningSnackCalories} cal)
                  </p>
                  <p>
                    <strong>Night:</strong> {food.night} ({food.nightCalories}{" "}
                    cal)
                  </p>
                  <p className="font-semibold mt-2">
                    Total Calories:{" "}
                    {[
                      food.morningCalories,
                      food.morningSnackCalories,
                      food.afternoonCalories,
                      food.eveningSnackCalories,
                      food.nightCalories,
                    ]
                      .map(Number)
                      .reduce((a, b) => a + b, 0)}{" "}
                    cal
                  </p>
                </div>

                <div className="mt-4 md:mt-0 space-x-3">
                  <Link
                    to={`/edit/${food._id}`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteFood(food._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
