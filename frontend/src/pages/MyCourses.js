import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_API_URL;
export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/my-courses`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => setCourses(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 px-4 py-6 relative">

      {/* ⬅ Back Arrow */}
      <button
        onClick={() => navigate("/home")}
        className="fixed top-4 left-4 w-11 h-11 flex items-center justify-center
                   bg-white rounded-full shadow-lg
                   hover:bg-indigo-600 hover:text-white
                   transition-all duration-300 hover:scale-110 z-40"
        aria-label="Back to home"
      >
        <span className="text-xl font-bold">←</span>
      </button>

      <div className="max-w-6xl mx-auto mt-12">

        <h1 className="text-2xl sm:text-3xl font-extrabold mb-8 text-gray-800 text-center sm:text-left">
          🎓 My Subscribed Courses
        </h1>

        {/* Loading */}
        {loading && (
          <p className="text-center text-lg font-medium text-gray-600">
            Loading your courses...
          </p>
        )}

        {/* Empty State */}
        {!loading && courses.length === 0 && (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-xl font-semibold">
              No courses subscribed yet 📭
            </p>
            <p className="mt-2">
              Start learning by subscribing to a course!
            </p>
          </div>
        )}

        {/* Course Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loading && courses.map(sub => (
            <div
              key={sub._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl
                         transition-transform duration-300 hover:-translate-y-1
                         overflow-hidden"
            >
              {/* Thumbnail */}
              <img
                src={sub.image}
                alt={sub.title}
                className="w-full h-44 object-cover"
              />

              <div className="p-5">
                <h2 className="text-lg font-bold text-gray-800 line-clamp-2">
                  {sub.title}
                </h2>

                <div className="mt-3 space-y-1">
                  <p className="text-gray-600 text-sm">
                    Price Paid:
                    <span className="font-semibold text-green-600 ml-1">
                      ₹{sub.pricePaid}
                    </span>
                  </p>

                  <p className="text-gray-500 text-xs">
                    Subscribed on:
                    <span className="ml-1">
                      {new Date(sub.subscribedAt).toLocaleDateString()}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
