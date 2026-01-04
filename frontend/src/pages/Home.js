import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/courses`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        setCourses(res.data);
        setAllCourses(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleFilter = (type) => {
    let filtered = [...allCourses];

    if (type === "free") filtered = filtered.filter(c => c.price === 0);
    if (type === "paid") filtered = filtered.filter(c => c.price > 0);

    if (search) {
      filtered = filtered.filter(c =>
        c.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setCourses(filtered);
  };

  const handleSearch = (value) => {
    setSearch(value);
    const filtered = allCourses.filter(c =>
      c.title.toLowerCase().includes(value.toLowerCase())
    );
    setCourses(filtered);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">

      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur shadow">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

          <h1 className="text-xl md:text-2xl font-bold text-blue-600">
            📚 Course Platform
          </h1>

          <div className="flex items-center gap-3">
            <Link
              to="/my-courses"
              className="hidden sm:block text-blue-600 font-semibold hover:underline"
            >
              My Courses
            </Link>

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-full text-sm transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* ================= CONTENT ================= */}
      <main className="p-4 md:p-6 max-w-7xl mx-auto">

        {/* Search + Filter */}
        <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">

          <input
            type="text"
            placeholder="🔍 Search courses..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full md:w-1/2 border p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <select
            className="w-full md:w-1/4 border p-3 rounded-xl focus:ring-2 focus:ring-blue-400"
            onChange={(e) => handleFilter(e.target.value)}
          >
            <option value="all">All Courses</option>
            <option value="free">Free Courses</option>
            <option value="paid">Paid Courses</option>
          </select>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center mt-20 text-xl">
            ⏳ Loading courses...
          </div>
        )}

        {/* Course Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {!loading && courses.map(course => (
            <Link
              key={course._id}
              to={`/course/${course._id}`}
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition transform hover:-translate-y-1 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-44 object-cover group-hover:scale-105 transition duration-300"
                />

                <span className={`absolute top-3 right-3 px-3 py-1 text-sm rounded-full text-white
                  ${course.price === 0 ? "bg-green-500" : "bg-blue-500"}`}>
                  {course.price === 0 ? "FREE" : `₹${course.price}`}
                </span>
              </div>

              <div className="p-4">
                <h2 className="font-bold text-lg mb-1 line-clamp-1">
                  {course.title}
                </h2>

                <p className="text-gray-600 text-sm line-clamp-2">
                  {course.description}
                </p>

                <div className="mt-4 flex justify-between items-center">
                  <span className="text-blue-600 font-semibold">
                    View Details
                  </span>
                  <span className="text-gray-400 group-hover:translate-x-1 transition">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty */}
        {!loading && courses.length === 0 && (
          <p className="text-center text-gray-500 mt-16 text-lg">
            😕 No courses found
          </p>
        )}
      </main>
    </div>
  );
}
