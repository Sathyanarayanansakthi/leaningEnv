import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Snackbar,
  Alert,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // 👇 Customer Info
  const [customer, setCustomer] = useState({
    name: "",
    addressLine1: "",
    city: "",
    postalCode: "",
    country: "IN", // 🇮🇳 India by default
  });

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleClose = () => setSnackbar((prev) => ({ ...prev, open: false }));

  const handlePayment = async () => {
    if (!stripe || !elements) {
      setSnackbar({
        open: true,
        message: "Stripe not ready yet. Please wait...",
        severity: "warning",
      });
      return;
    }

    if (!customer.name || !customer.addressLine1 || !customer.city || !customer.postalCode) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields.",
        severity: "warning",
      });
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // ✅ Include customer details in the request
      const { data } = await axios.post(
        "http://localhost:5000/api/payment/create-payment-intent",
        {
          amount,
          customerName: customer.name,
          billingAddress: {
            line1: customer.addressLine1,
            city: customer.city,
            postalCode: customer.postalCode,
            country: customer.country,
          },
          receiptEmail: "", // optionally use user.email if logged in
        },
        token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      );

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: customer.name,
            address: {
              line1: customer.addressLine1,
              city: customer.city,
              postal_code: customer.postalCode,
              country: customer.country,
            },
          },
        },
      });

      if (result.error) {
        setSnackbar({
          open: true,
          message: result.error.message,
          severity: "error",
        });
      } else if (result.paymentIntent.status === "succeeded") {
        await axios.post(
          "http://localhost:5000/api/payment/save-payment",
          {
            paymentIntentId: result.paymentIntent.id,
            amount,
            status: result.paymentIntent.status,
          },
          token ? { headers: { Authorization: `Bearer ${token}` } } : {}
        );

        setSnackbar({
          open: true,
          message: "Payment successful! 🎉",
          severity: "success",
        });

        navigate("/dashboard");
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.error || err.message,
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box mt={3}>
      <Card sx={{ p: 3, borderRadius: 4, boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}>
        <CardContent>
          <Typography variant="h6" fontWeight="600" gutterBottom>
            Secure Payment
          </Typography>

          {/* 👇 Customer Billing Details */}
          <Box component="form" sx={{ mb: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Full Name"
              name="name"
              value={customer.name}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Address Line 1"
              name="addressLine1"
              value={customer.addressLine1}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="City"
              name="city"
              value={customer.city}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Postal Code"
              name="postalCode"
              value={customer.postalCode}
              onChange={handleChange}
              required
              fullWidth
            />
          </Box>

          {/* 👇 Card Element */}
          <Box
            sx={{
              p: 2,
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              mb: 2,
              backgroundColor: "#fafafa",
            }}
          >
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": { color: "#aab7c4" },
                    fontFamily: "Roboto, sans-serif",
                  },
                  invalid: { color: "#d32f2f" },
                },
                hidePostalCode: true,
              }}
            />
          </Box>

          {/* 👇 Pay Button */}
          <Button
            variant="contained"
            fullWidth
            disabled={!stripe || loading}
            onClick={handlePayment}
            sx={{
              mt: 2,
              py: 1.5,
              borderRadius: 3,
              fontWeight: "bold",
              fontSize: "1rem",
              background: "linear-gradient(90deg, #4b6cb7 0%, #182848 100%)",
              "&:hover": {
                background: "linear-gradient(90deg, #182848 0%, #4b6cb7 100%)",
              },
            }}
          >
            {loading ? <CircularProgress size={24} /> : `Pay $${amount}`}
          </Button>
        </CardContent>
      </Card>

      {/* Snackbar Notifications */}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CheckoutForm;
