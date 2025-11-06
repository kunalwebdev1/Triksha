import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function RoleBasedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  const role = user?.role;

  // Handle loading or missing user
  if (!role) {
    return <Navigate to="/login" />;
  }

  // Case-insensitive match
  const normalizedRole = role.toLowerCase();
  const normalizedAllowed = allowedRoles.map(r => r.toLowerCase());

  if (!normalizedAllowed.includes(normalizedRole)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}
