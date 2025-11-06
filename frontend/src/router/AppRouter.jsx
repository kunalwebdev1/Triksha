import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";
import Splash from "../pages/Splash/Splash";
import PatientDashboard from "../pages/Dashboard/PatientDashboard";
import DoctorDashboard from "../pages/Dashboard/DoctorDashboard";
import HospitalDashboard from "../pages/Dashboard/HospitalDashboard";
import LabDashboard from "../pages/Dashboard/LaboratoryDashboard";
// import PharmacyDashboard from "../pages/Dashboard/PharmacyDashboard";
// import CaregiverDashboard from "../pages/Dashboard/CaregiverDashboard";
import InsuranceDashboard from "../pages/Dashboard/InsuranceDashboard";
// import Notifications from "../pages/Notifications/Notifications";
import UserProfileCard from "../components/profile/UserProfileCard";
import Settings from "../pages/Settings/Settings";
import ForgetPassword from "../components/auth/ForgetPasswordForm";
import NotFoundPage from "../pages/Splash/PageNotFound";
import AIPrescriptionPage from "../pages/AI/AIPrescriptionPage";
import DoctorsPage from "../pages/Patients/DoctorPage";
import AppointmentPage from "../pages/Patients/AppointmentPage";
import ChatWithDoctorPage from "../pages/Patients/ChatWithDoctor";
import PaymentsPage from "../pages/Patients/PaymentsPage";
import MedicalHistoryPage from "../pages/Patients/MedicalHistoryPage";
import EmergencyServicesPage from "../pages/Patients/EmergencyServicesPage";
import FeedbackPage from "../pages/Patients/FeedbackPage";

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
  if (user.role === "Laboratory Admin") return <Navigate to="/lab/dashboard" />;
  if (user.role === "Pharmacy Admin") return <Navigate to="/pharmacy/dashboard" />;
  if (user.role === "Caregiver") return <Navigate to="/caregiver/dashboard" />;
  if (user.role === "Insurance TPA") return <Navigate to="/insurance/dashboard" />;
  return <Navigate to="/patient/dashboard" />;
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/splash" />} />
      <Route path="/splash" element={<Splash />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      {/* <Route path="/notifications" element={<Notifications />} /> */}
      <Route path="/profile" element={<UserProfileCard />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/forgetpassword" element={<ForgetPassword />} />
      <Route path="/TrikshaAI" element={<AIPrescriptionPage />} />
      <Route path="/doctors" element={<DoctorsPage />} />
      <Route path="/appointment" element={<AppointmentPage />} />
      <Route path="/chat" element={<ChatWithDoctorPage />} />
      <Route path="/payments" element={<PaymentsPage />} />
      <Route path="/medical-history" element={<MedicalHistoryPage />} />
      <Route path="/emergency" element={<EmergencyServicesPage />} />
      <Route path="/feedback" element={<FeedbackPage />} />

      <Route
        path="patient/dashboard"
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
            <RoleBasedRoute allowedRoles={["Hospital", "Clinic", "Hospital/Clinic Admin"]}>
              <HospitalDashboard />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/lab/dashboard"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["Laboratory Admin"]}>
              <LabDashboard />  
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />  
      {/* <Route
        path="/pharmacy/dashboard"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["Pharmacy Admin"]}>
              <PharmacyDashboard />
            </RoleBasedRoute>
          </ProtectedRoute>
        }   
      />
      <Route
        path="/caregiver/dashboard" 
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["Caregiver"]}>
              <CaregiverDashboard />
            </RoleBasedRoute>
          </ProtectedRoute> 
        }
      /> */}
      <Route
        path="/insurance/dashboard"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["Insurance TPA"]}>
              <InsuranceDashboard />
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
      // Catch-all route for 404
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}