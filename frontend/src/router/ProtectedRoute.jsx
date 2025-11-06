import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // better than null

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
