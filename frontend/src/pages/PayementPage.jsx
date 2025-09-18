import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { Box, Typography } from "@mui/material";

// ✅ Your Stripe public key
const stripePromise = loadStripe("");

const PaymentPage = () => {
  const amount = 7;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        px: 2,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 600 }}>
        <Typography variant="h4" textAlign="center" mb={2}>
          Pay for the 7-Day Language Challenge
        </Typography>

        {/*Wrap your form inside Elements */}
        <Elements stripe={stripePromise}>
          <CheckoutForm amount={amount} />
        </Elements>
      </Box>
    </Box>
  );
};

export default PaymentPage;
