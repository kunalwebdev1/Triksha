import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useAuth() {
  const context = useContext(AuthContext);
  // Always return an object with isAuthenticated, loading, and user
  if (!context) {
    return { isAuthenticated: false, loading: false, user: null, login: () => {}, logout: () => {} };
  }
  return context;
}