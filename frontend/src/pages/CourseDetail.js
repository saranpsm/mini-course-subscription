import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;
export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [finalPrice, setFinalPrice] = useState(0);
  const [message, setMessage] = useState("");

  // 🔔 Toast
  const [toast, setToast] = useState({ show: false, text: "", type: "" });

  useEffect(() => {
    axios
      .get(`${API}/courses/${id}`)
      .then((res) => {
        setCourse(res.data);
        setFinalPrice(res.data.price);
      })
      .catch(() => showToast("Failed to load course ❌", "error"));
  }, [id]);

  // 🔔 Toast helper
  const showToast = (text, type) => {
    setToast({ show: true, text, type });
    setTimeout(() => setToast({ show: false, text: "", type: "" }), 3000);
  };

  const applyPromo = () => {
    if (promoCode === "BFSALE25") {
      setFinalPrice(course.price / 2);
      setPromoApplied(true);
      setMessage("Promo applied! You saved 50% 🎉");
    } else {
      setPromoApplied(false);
      setMessage("Invalid promo code ❌");
    }
  };

  const subscribe = () => {
    axios
      .post(
        `${API}/subscribe`,
        {
          courseId: course._id,
          pricePaid: finalPrice,
          promoCode
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      .then(() => {
        showToast("Subscribed successfully ✅", "success");
        setTimeout(() => navigate("/my-courses"), 1500);
      })
      .catch(() => showToast("Subscription failed ❌", "error"));
  };

  if (!course) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading course details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 px-4 py-6 relative">

    
      {toast.show && (
        <div
          className={`fixed top-4 right-4 px-5 py-3 rounded-xl shadow-xl text-white z-50
          animate-slideIn
          ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {toast.text}
        </div>
      )}

    
      <button
        onClick={() => navigate("/home")}
        className="fixed top-4 left-4 w-11 h-11 flex items-center justify-center
                   bg-white rounded-full shadow-lg
                   hover:bg-indigo-600 hover:text-white
                   transition-all duration-300 hover:scale-110 z-40"
        aria-label="Back"
      >
        <span className="text-xl font-bold">←</span>
      </button>

      {/* Main Card */}
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden mt-12">

        {/* Image */}
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-26 sm:h-72 object-cover"
        />

        {/* Content */}
        <div className="p-6 sm:p-10">
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-4 text-gray-800">
            {course.title}
          </h1>

          <p className="text-gray-600 text-base sm:text-lg mb-6 leading-relaxed">
            {course.description}
          </p>

          {/* Price */}
          <div className="mb-8">
            {course.price === 0 ? (
              <span className="text-3xl font-bold text-green-600">
                FREE COURSE 🎁
              </span>
            ) : (
              <div className="flex items-center gap-4">
                {promoApplied && (
                  <span className="line-through text-gray-400 text-lg">
                    ₹{course.price}
                  </span>
                )}
                <span className="text-3xl font-bold text-indigo-600">
                  ₹{finalPrice}
                </span>
              </div>
            )}
          </div>

          {/* Subscription */}
          {course.price === 0 ? (
            <button
              onClick={subscribe}
              className="w-full sm:w-auto bg-green-600 text-white px-8 py-3
                         rounded-xl font-semibold hover:bg-green-700 transition"
            >
              Subscribe Now
            </button>
          ) : (
            <div className="space-y-4 max-w-md">
              <input
                type="text"
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="w-full border p-3 rounded-xl focus:ring-2
                           focus:ring-indigo-500 outline-none"
              />

              <button
                onClick={applyPromo}
                className="w-full bg-yellow-500 text-white py-3 rounded-xl
                           font-semibold hover:bg-yellow-600 transition"
              >
                Apply Promo Code
              </button>

              {message && (
                <p
                  className={`font-medium ${
                    promoApplied ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {message}
                </p>
              )}

              <button
                disabled={!promoApplied}
                onClick={subscribe}
                className={`w-full py-3 rounded-xl text-white font-semibold transition
                  ${
                    promoApplied
                      ? "bg-indigo-600 hover:bg-indigo-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
              >
                Subscribe
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-slideIn {
            animation: slideIn 0.4s ease-out;
          }
        `}
      </style>
    </div>
  );
}
