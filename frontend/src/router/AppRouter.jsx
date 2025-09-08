import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import LoginForm from "../components/auth/LoginForm.jsx";
import SignupForm from "../components/auth/SignupForm.jsx";
import DashboardCard from "../components/dashboard/DashboardCard.jsx";
import Splash from "../pages/Splash/Splash.jsx";

// Protected route
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = true; // replace with auth context
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/splash" />} />
      <Route path="/splash" element={<Splash />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />

      {/* Protected route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardCard />
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
