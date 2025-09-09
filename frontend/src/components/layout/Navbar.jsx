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
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PeopleIcon from "@mui/icons-material/People";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PaymentIcon from "@mui/icons-material/Payment";
import HistoryIcon from "@mui/icons-material/History";
import EmergencyIcon from "@mui/icons-material/LocalFireDepartment";
import ScienceIcon from "@mui/icons-material/Science";
import EmailIcon from "@mui/icons-material/Email";
import GroupIcon from "@mui/icons-material/Group";
import FeedbackIcon from "@mui/icons-material/Feedback";
import logo from "../../assets/logos/Triksha-text.png";
import { Link } from "react-router-dom";

const navStyles = {
  width: 260,
  minHeight: "100vh",
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
  { to: "/chat", icon: <ChatIcon />, label: "Chat With Doctors", badge: 1 },
  { to: "/calendar", icon: <CalendarMonthIcon />, label: "Calendar" },
  { to: "/appointment", icon: <EventAvailableIcon />, label: "Appointment" },
  { to: "/doctors", icon: <PeopleIcon />, label: "Doctors" },
  { to: "/room-allotment", icon: <LocalHospitalIcon />, label: "Room Allotment" },
  { to: "/payments", icon: <PaymentIcon />, label: "Payments" },
  { to: "/medical-history", icon: <HistoryIcon />, label: "Medical History" },
  { to: "/emergency", icon: <EmergencyIcon />, label: "Emergency Services" },
  { to: "/prescription", icon: <ScienceIcon />, label: "Prescription analyser" },
];

const doctorLinks = [
  { to: "/doctor/dashboard", icon: <DashboardIcon />, label: "Dashboard" },
  { to: "/email", icon: <EmailIcon />, label: "Email", badge: 1 },
  { to: "/calendar", icon: <CalendarMonthIcon />, label: "Calendar" },
  { to: "/appointment", icon: <EventAvailableIcon />, label: "Appointment" },
  { to: "/doctors", icon: <PeopleIcon />, label: "Doctors" },
  { to: "/staff", icon: <GroupIcon />, label: "Other Staff" },
  { to: "/patients", icon: <PeopleIcon />, label: "Patients" },
  { to: "/payments", icon: <PaymentIcon />, label: "Payments" },
];

const hospitalLinks = [
  { to: "/hospital/dashboard", icon: <DashboardIcon />, label: "Dashboard" },
  { to: "/email", icon: <EmailIcon />, label: "Email", badge: 1 },
  { to: "/calendar", icon: <CalendarMonthIcon />, label: "Calendar" },
  { to: "/appointment", icon: <EventAvailableIcon />, label: "Appointment" },
  { to: "/doctors", icon: <PeopleIcon />, label: "Doctors" },
  { to: "/staff", icon: <GroupIcon />, label: "Other Staff" },
  { to: "/patients", icon: <PeopleIcon />, label: "Patients" },
  { to: "/room-allotment", icon: <LocalHospitalIcon />, label: "Room Allotment" },
  { to: "/payments", icon: <PaymentIcon />, label: "Payments" },
];

function ResponsiveSidebar({ links, selectedPath }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);

  const sidebarContent = (
    <Box sx={navStyles}>
      <img src={logo} alt="Triksha Logo" style={logoStyles} />
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
      <Box sx={feedbackStyles}>
        <FeedbackIcon sx={{ mr: 1 }} />
        <Typography>FeedBack</Typography>
      </Box>
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