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
    let filtered = allCourses;

    if (type === "free") {
      filtered = filtered.filter(c => c.price === 0);
    } else if (type === "paid") {
      filtered = filtered.filter(c => c.price > 0);
    }

    // apply search on filtered data
    if (search) {
      filtered = filtered.filter(c =>
        c.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setCourses(filtered);
  };

  const handleSearch = (value) => {
    setSearch(value);

    let filtered = allCourses.filter(c =>
      c.title.toLowerCase().includes(value.toLowerCase())
    );

    setCourses(filtered);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Navbar */}
      <div className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">
          Course Platform
        </h1>

        <div className="space-x-4">
          <Link to="/my-courses" className="text-blue-600 font-semibold">
            My Courses
          </Link>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-w-7xl mx-auto">

        {/* Search + Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="border p-2 rounded w-full sm:w-1/2"
          />

          {/* Filter */}
          <select
            className="border p-2 rounded w-full sm:w-1/4"
            onChange={(e) => handleFilter(e.target.value)}
          >
            <option value="all">All Courses</option>
            <option value="free">Free Courses</option>
            <option value="paid">Paid Courses</option>
          </select>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center text-xl mt-10">
            Loading courses...
          </div>
        )}

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {!loading && courses.map(course => (
            <Link
              key={course._id}
              to={`/course/${course._id}`}
              className="bg-white rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-44 object-cover rounded-t-xl"
              />

              <div className="p-4">
                <h2 className="font-bold text-lg mb-1">
                  {course.title}
                </h2>

                <p className="text-gray-600 text-sm line-clamp-2">
                  {course.description}
                </p>

                <div className="mt-3 flex justify-between items-center">
                  <span className={`font-bold ${
                    course.price === 0
                      ? "text-green-600"
                      : "text-blue-600"
                  }`}>
                    {course.price === 0 ? "FREE" : `₹${course.price}`}
                  </span>

                  <span className="text-sm text-gray-400">
                    View →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {!loading && courses.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No courses found
          </p>
        )}
      </div>
    </div>
  );
}
