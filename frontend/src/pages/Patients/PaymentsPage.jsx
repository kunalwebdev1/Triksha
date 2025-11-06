import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  UserSidebar,
  DoctorSidebar,
  HospitalSidebar,
  LabSidebar,
  InsuranceSidebar,
} from "../../components/layout/Navbar";
import HeaderBar from "../../components/layout/Header";

// Sidebar based on role
const RoleBasedSidebar = ({ role }) => {
  switch (role) {
    case "Doctor":
      return <DoctorSidebar />;
    case "Hospital":
    case "Clinic":
    case "Hospital/Clinic Admin":
      return <HospitalSidebar />;
    case "Laboratory Admin":
      return <LabSidebar />;
    case "Insurance TPA":
      return <InsuranceSidebar />;
    default:
      return <UserSidebar />;
  }
};

const PaymentsPage = () => {
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");
  const [payments, setPayments] = useState([]);

  // Load logged-in user
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("triksha_user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleMakePayment = () => {
    if (!amount || !method) return;

    const newPayment = {
      id: payments.length + 1,
      amount,
      method,
      date: new Date().toLocaleString(),
    };

    setPayments((prev) => [...prev, newPayment]);
    setAmount("");
    setMethod("");
  };

  if (!user) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <HeaderBar userName={user?.name || "Guest"} />
      <Box sx={{ display: "flex", flex: 1, pt: "64px" }}>
        <RoleBasedSidebar role={user.role} />
        <Box sx={{ flex: 1, p: { xs: 2, md: 4 }, background: "#FFF6FA" }}>
          <Typography variant="h5" fontWeight={700} mb={3}>
            Payments
          </Typography>

          {/* Payment Form */}
          <Card sx={{ mb: 4, p: 3, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Make a Payment
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Payment Method"
                  placeholder="e.g., UPI, Credit Card"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="contained"
                  sx={{ background: "#B2005E", color: "#fff" }}
                  fullWidth
                  onClick={handleMakePayment}
                >
                  Pay
                </Button>
              </Grid>
            </Grid>
          </Card>

          {/* Payment History */}
          <Card sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Payment History
            </Typography>
            {payments.length === 0 ? (
              <Typography color="text.secondary">No payments yet.</Typography>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Method</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {payments.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>{p.id}</TableCell>
                      <TableCell>{p.amount}</TableCell>
                      <TableCell>{p.method}</TableCell>
                      <TableCell>{p.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentsPage;
