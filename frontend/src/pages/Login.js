import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;
export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const url = isSignup
      ? `${API}/auth/signup`
      : `${API}/auth/login`;

      const payload = isSignup
        ? { name, email, password }
        : { email, password };

      const res = await axios.post(url, payload);

      if (!isSignup) {
        localStorage.setItem("token", res.data.token);
        navigate("/home");
      } else {
        alert("Signup successful! Please login.");
        setIsSignup(false);
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">

      {/* Floating Book Icons */}
      <div className="absolute text-white/20 text-6xl top-10 left-10 animate-pulse">📘</div>
      <div className="absolute text-white/20 text-7xl top-1/3 right-16 animate-bounce">📕</div>
      <div className="absolute text-white/20 text-6xl bottom-20 left-1/4 animate-pulse">📗</div>
      <div className="absolute text-white/20 text-7xl bottom-10 right-10 animate-bounce">📙</div>

      

      {/* Glass Card */}
      <div className="relative z-10 backdrop-blur-xl bg-white/20 p-8 rounded-2xl shadow-2xl w-[380px] text-white">

        <h2 className="text-3xl font-bold text-center mb-2">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>

        <p className="text-center text-sm mb-6 text-white/80">
          Learn new skills, anytime, anywhere 📚
        </p>

        {error && (
          <div className="bg-red-500/80 text-white text-sm p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {isSignup && (
            <input
              className="w-full p-3 rounded bg-white/20 placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            className="w-full p-3 rounded bg-white/20 placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="w-full p-3 rounded bg-white/20 placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            disabled={loading}
            className={`w-full py-3 rounded font-semibold transition 
            ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-white text-indigo-600 hover:bg-gray-200"}`}
          >
            {loading ? "Please wait..." : isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-white/80">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            onClick={() => {
              setIsSignup(!isSignup);
              setError("");
            }}
            className="ml-1 font-semibold underline"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
