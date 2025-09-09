import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";
import Splash from "../pages/Splash/Splash";
import PatientDashboard from "../pages/Dashboard/PatientDashboard";
import DoctorDashboard from "../pages/Dashboard/DoctorDashboard";
import HospitalDashboard from "../pages/Dashboard/HospitalDashboard";

// Protected/Role-based routes
import ProtectedRoute from "./ProtectedRoute";
import RoleBasedRoute from "./RoleBasedRoute";
import { useAuth } from "../hooks/useAuth";

// Helper component to redirect to the correct dashboard based on user role
function DashboardRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.role === "Doctor") return <Navigate to="/doctor/dashboard" />;
  if (user.role === "Hospital" || user.role === "Clinic" || user.role === "Hospital/Clinic")
    return <Navigate to="/hospital/dashboard" />;
  return <Navigate to="/patient/dashboard" />;
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/splash" />} />
      <Route path="/splash" element={<Splash />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />

      <Route
        path="/patient/dashboard"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["Patient"]}>
              <PatientDashboard />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/dashboard"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["Doctor"]}>
              <DoctorDashboard />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/hospital/dashboard"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["Hospital", "Clinic", "Hospital/Clinic"]}>
              <HospitalDashboard />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />

      {/* Redirect authenticated users to their dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardRedirect />
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}