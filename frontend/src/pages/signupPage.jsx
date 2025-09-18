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
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

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
      await axios.post("http://localhost:5000/api/auth/signup", formData, {
        withCredentials: true,
      });

      // Show success snackbar with modern gradient
      setSnackbar({
        open: true,
        message: "Account created! Please log in.",
        severity: "success",
      });

      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.error || "Signup failed",
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
            Create Account
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              name="name"
              label="Full Name"
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />
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
                  background: "linear-gradient(90deg, #182848 0%, #4b6cb7 100%)",
                },
              }}
            >
              Sign Up
            </Button>
            <Divider sx={{ my: 2 }} />
            <Typography>
              Already have an account? <RouterLink to="/login">Login</RouterLink>
            </Typography>
          </Box>
        </Paper>
      </Container>

      {/* Modern Snackbar */}
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

export default SignupPage;
