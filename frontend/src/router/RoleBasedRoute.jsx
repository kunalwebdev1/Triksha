import React from "react";
import { Navigate } from "react-router-dom";
import { useRole } from "../hooks/useRole";

export default function RoleBasedRoute({ children, allowedRoles }) {
  const { role } = useRole();

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}
