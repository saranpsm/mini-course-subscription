import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CourseDetail from "./pages/CourseDetail";
import MyCourses from "./pages/MyCourses";
import React from "react";

// Auth guard
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Login />} />

        {/* Protected */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/course/:id"
          element={
            <PrivateRoute>
              <CourseDetail />
            </PrivateRoute>
          }
        />

        <Route
          path="/my-courses"
          element={
            <PrivateRoute>
              <MyCourses />
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
