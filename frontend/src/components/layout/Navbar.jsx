import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
  Drawer,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ChatIcon from "@mui/icons-material/Chat";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PeopleIcon from "@mui/icons-material/People";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PaymentIcon from "@mui/icons-material/Payment";
import HistoryIcon from "@mui/icons-material/History";
import EmergencyIcon from '@mui/icons-material/Emergency';
import ScienceIcon from "@mui/icons-material/Science";
import EmailIcon from "@mui/icons-material/Email";
import GroupIcon from "@mui/icons-material/Group";
import FeedbackIcon from "@mui/icons-material/Feedback";
import BiotechIcon from '@mui/icons-material/Biotech';
import SummarizeIcon from '@mui/icons-material/Summarize';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import TuneIcon from '@mui/icons-material/Tune';
import { Link } from "react-router-dom";

const navStyles = {
  width: 260,
  minHeight: "100%",
  background: "#FFD8E4",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  py: 2,
};

const logoStyles = {
  width: 150,
  margin: "24px 0 16px 0",
};

const feedbackStyles = {
  mt: "auto",
  mb: 2,
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#222",
};

const userLinks = [
  { to: "/patient/dashboard", icon: <DashboardIcon />, label: "Dashboard" },
  { to: "/chat", icon: <ChatIcon />, label: "Chat With Doctors" },
  { to: "/appointment", icon: <EventAvailableIcon />, label: "Appointment" },
  { to: "/doctors", icon: <PeopleIcon />, label: "Doctors" },
  { to: "/payments", icon: <PaymentIcon />, label: "Payments" },
  { to: "/medical-history", icon: <HistoryIcon />, label: "Medical History" },
  { to: "/emergency", icon: <EmergencyIcon />, label: "Emergency Services" },
  { to: "/TrikshaAi", icon: <ScienceIcon />, label: "Prescription Analyser" },
  { to: "/feedback", icon: <FeedbackIcon />, label: "Feedback" },
];

const doctorLinks = [
  { to: "/doctor/dashboard", icon: <DashboardIcon />, label: "Dashboard" },
  { to: "/chat", icon: <ChatIcon />, label: "Chat", badge: 1 },
  { to: "/appointment", icon: <EventAvailableIcon />, label: "Appointment" },
  { to: "/doctors", icon: <PeopleIcon />, label: "Doctors" },
  { to: "/staff", icon: <GroupIcon />, label: "Other Staff" },
  { to: "/patients", icon: <PeopleIcon />, label: "Patients" },
  { to: "/payments", icon: <PaymentIcon />, label: "Payments" },
  { to: "/feedback", icon: <FeedbackIcon />, label: "Feedback" },
];

const hospitalLinks = [
  { to: "/hospital/dashboard", icon: <DashboardIcon />, label: "Dashboard" },
  { to: "/email", icon: <EmailIcon />, label: "Email", badge: 1 },
  { to: "/appointment", icon: <EventAvailableIcon />, label: "Appointment" },
  { to: "/doctors", icon: <PeopleIcon />, label: "Doctors" },
  { to: "/staff", icon: <GroupIcon />, label: "Other Staff" },
  { to: "/patients", icon: <PeopleIcon />, label: "Patients" },
  { to: "/room-allotment", icon: <LocalHospitalIcon />, label: "Room Allotment" },
  { to: "/payments", icon: <PaymentIcon />, label: "Payments" },
  { to: "/feedback", icon: <FeedbackIcon />, label: "Feedback" },
];

const Lablinks = [
  { to: "/lab/dashboard", icon: <DashboardIcon />, label: "Dashboard" },
  { to: "/samplemanagement", icon: <ScienceIcon />, label: "Sample Management" },
  { to: "/testprocessing", icon: <BiotechIcon />, label: "Test Processing" },
  { to: "/reports", icon: <SummarizeIcon />, label: "Reports" },
  { to: "/inventory", icon: <Inventory2Icon />, label: "Inventory" },
  { to: "/qualitycontrol", icon: <TuneIcon />, label: "Quality Control" },
  { to: "staff", icon: <GroupIcon />, label: "Staff" },
  { to: "/patients", icon: <PeopleIcon />, label: "Patients" },
  { to: "/billingclaims", icon: <PaymentIcon />, label: "Billing & Claims" },
  { to: "/feedback", icon: <FeedbackIcon />, label: "Feedback" },
];

const Caregiverlinks = [
  { to: "/caregiver/dashboard", icon: <DashboardIcon />, label: "Dashboard" },
  { to: "/patients", icon: <PeopleIcon />, label: "Patients" },
  { to: "/appointments", icon: <EventAvailableIcon />, label: "Appointments" },
  { to: "/medications", icon: <ScienceIcon />, label: "Medications" },
  { to: "/reports", icon: <SummarizeIcon />, label: "Reports" },
  { to: "/billing", icon: <PaymentIcon />, label: "Billing" },
  { to: "/feedback", icon: <FeedbackIcon />, label: "Feedback" },
];

const InsuranceLinks = [
  { to: "/insurance/dashboard", icon: <DashboardIcon />, label: "Dashboard" },
  { to: "/policies", icon: <Inventory2Icon />, label: "Policies" }, 
  { to: "/claims", icon: <PaymentIcon />, label: "Claims" },
  { to: "/customers", icon: <PeopleIcon />, label: "Customers" },
  { to: "/reports", icon: <SummarizeIcon />, label: "Reports" },
  { to: "/feedback", icon: <FeedbackIcon />, label: "Feedback" },
];

const PharmacyLinks = [
  { to: "/pharmacy/dashboard", icon: <DashboardIcon />, label: "Dashboard" },
  { to: "/inventory", icon: <Inventory2Icon />, label: "Inventory" },
  { to: "/orders", icon: <EventAvailableIcon />, label: "Orders" },
  { to: "/suppliers", icon: <PeopleIcon />, label: "Suppliers" },
  { to: "/sales", icon: <PaymentIcon />, label: "Sales" },
  { to: "/billing", icon: <PaymentIcon />, label: "Billing" },
  { to: "/reports", icon: <SummarizeIcon />, label: "Reports" },
  { to: "/feedback", icon: <FeedbackIcon />, label: "Feedback" },
];

function ResponsiveSidebar({ links, selectedPath }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);

  const sidebarContent = (
    <Box sx={navStyles}>
      <List sx={{ width: "100%" }}>
        {links.map((item) => (
          <ListItem
            button
            key={item.label}
            component={Link}
            to={item.to}
            selected={selectedPath === item.to}
            sx={{
              color: "#000",
              "&.Mui-selected": {
                background: "#F7CFE1",
                fontWeight: 600,
              },
            }}
          >
            <ListItemIcon sx={{ color: "#000" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
            {item.badge && (
              <Badge badgeContent={item.badge} color="secondary" sx={{ ml: 1 }} />
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <>
          <IconButton
            onClick={() => setOpen(true)}
            sx={{
              position: "fixed",
              top: 16,
              left: 16,
              zIndex: 1300,
              background: "#FFD8E4",
              "&:hover": { background: "#F7CFE1" },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={open}
            onClose={() => setOpen(false)}
            PaperProps={{ sx: { width: 260, background: "#FFD8E4" } }}
          >
            {sidebarContent}
          </Drawer>
        </>
      ) : (
        <Box sx={{ minWidth: 260 }}>{sidebarContent}</Box>
      )}
    </>
  );
}

// Usage: pass selectedPath={location.pathname} from your page if you want highlighting

export function UserSidebar(props) {
  return <ResponsiveSidebar links={userLinks} {...props} />;
}
export function DoctorSidebar(props) {
  return <ResponsiveSidebar links={doctorLinks} {...props} />;
}
export function HospitalSidebar(props) {
  return <ResponsiveSidebar links={hospitalLinks} {...props} />;
}
export function LabSidebar(props) {
  return <ResponsiveSidebar links={Lablinks} {...props} />;
}
export function CaregiverSidebar(props) {
  return <ResponsiveSidebar links={Caregiverlinks} {...props} />;
} 
export function InsuranceSidebar(props) {
  return <ResponsiveSidebar links={InsuranceLinks} {...props} />;
} 
export function PharmacySidebar(props) {
  return <ResponsiveSidebar links={PharmacyLinks} {...props} />;
}