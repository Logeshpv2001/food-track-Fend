import React, { useEffect, useState } from "react";
import AxiosInstance from "../utilities/AxiosInstance";
import { Link } from "react-router-dom";
import { toast } from "sonner";

function Home() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const userEmail = sessionStorage.getItem("userEmail");
  // console.log(userEmail);

  const fetchFoods = async () => {
    try {
      const res = await AxiosInstance.get(`/api/foodsforusers`);
      // console.log(res);
      const data = Array.isArray(res.data) ? res.data : [];
      setFoods(data);
    } catch (error) {
      console.error("Error fetching food data:", error);
      setFoods([]);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {},  
  
  // []);

  const deleteFood = async (id) => {
    try {
      await AxiosInstance.delete(`/api/foods/${id}`);
      toast.success("Deleted Successfully");
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
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-8 animate-fade-in">
          🍱 Tracked Food Entries
        </h2>

        {foods.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No food entries found. Start tracking your meals today!
          </p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-blue-200 text-blue-800 text-sm">
                <tr>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Morning</th>
                  <th className="px-4 py-2">Morning Snack</th>
                  <th className="px-4 py-2">Afternoon</th>
                  <th className="px-4 py-2">Evening Snack</th>
                  <th className="px-4 py-2">Night</th>
                  <th className="px-4 py-2">Total Calories</th>
                  <th className="px-4 py-2">Edit</th>
                  <th className="px-4 py-2">Delete</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {foods.map((food) => {
                  const totalCalories = [
                    food.morningCalories,
                    food.morningSnackCalories,
                    food.afternoonCalories,
                    food.eveningSnackCalories,
                    food.nightCalories,
                  ]
                    .map((cal) => parseInt(cal) || 0)
                    .reduce((a, b) => a + b, 0);

                  return (
                    <tr
                      key={food._id}
                      className="border-b hover:bg-blue-50 transition"
                    >
                      <td className="px-4 py-2 font-medium">
                        {new Date(food.date).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-4 py-2">
                        {food.morning} ({food.morningCalories} cal)
                      </td>
                      <td className="px-4 py-2">
                        {food.morningSnack} ({food.morningSnackCalories} cal)
                      </td>
                      <td className="px-4 py-2">
                        {food.afternoon} ({food.afternoonCalories} cal)
                      </td>
                      <td className="px-4 py-2">
                        {food.eveningSnack} ({food.eveningSnackCalories} cal)
                      </td>
                      <td className="px-4 py-2">
                        {food.night} ({food.nightCalories} cal)
                      </td>
                      <td className="px-4 py-2 font-semibold">
                        {totalCalories} cal
                      </td>
                      <td className="px-4 py-2 space-x-2">
                        <Link
                          to={`/edit/${food._id}`}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm"
                        >
                          Edit
                        </Link>
                      </td>
                      <td className="px-4 py-2 space-x-2">
                        <button
                          onClick={() => deleteFood(food._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
