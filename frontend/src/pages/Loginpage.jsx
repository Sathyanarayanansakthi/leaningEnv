import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        { withCredentials: true }
      );

      const { token, user } = res.data;

      // Save token and user data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Show success snackbar
      setSnackbar({
        open: true,
        message: "Login successful!",
        severity: "success",
      });

      // Redirect based on payment status
      setTimeout(() => {
        if (user.hasPaid) {
          navigate("/dashboard");
        } else {
          navigate("/payment");
        }
      }, 1200);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.error || "Login failed",
        severity: "error",
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f7fa",
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 6 }}>
          <Typography variant="h4" gutterBottom>
            Welcome Back
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              name="email"
              label="Email"
              type="email"
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              fullWidth
              name="password"
              label="Password"
              type="password"
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />
            <Button
              type="submit"
              fullWidth
              sx={{
                mt: 1,
                mb: 2,
                background: "linear-gradient(90deg, #4b6cb7 0%, #182848 100%)",
                color: "white",
                fontWeight: "bold",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #182848 0%, #4b6cb7 100%)",
                },
              }}
            >
              Login
            </Button>
            <Divider sx={{ my: 2 }} />
            <Typography>
              Don’t have an account?{" "}
              <RouterLink to="/signup">Sign Up</RouterLink>
            </Typography>
          </Box>
        </Paper>
      </Container>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{
            width: "100%",
            background:
              snackbar.severity === "success"
                ? "linear-gradient(90deg, #4b6cb7 0%, #182848 100%)"
                : "linear-gradient(90deg, #b74b4b 0%, #841818 100%)",
            color: "white",
            fontWeight: "bold",
            boxShadow: 3,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginPage;
