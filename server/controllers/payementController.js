import Stripe from "stripe";
import Payment from "../models/Payment.js";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY missing in .env file");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

// Create PaymentIntent
export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, description, customerName, billingAddress, receiptEmail } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    if (
      !customerName ||
      !billingAddress?.line1 ||
      !billingAddress?.city ||
      !billingAddress?.postalCode ||
      !billingAddress?.country
    ) {
      return res.status(400).json({ error: "Missing required customer information" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert dollars to cents
      currency: "usd",
      payment_method_types: ["card"],
      description: description || "7-Day Language Challenge Payment",
      receipt_email: receiptEmail || undefined,
      metadata: {
        userId: req.user?._id?.toString() || "guest",
        challengeType: "7-day-language-challenge",
        customerName,
        ...billingAddress,
      },
    });

    console.log("PaymentIntent created:", paymentIntent.id);
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (err) {
    console.error("Stripe Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Save Payment + Update User
export const savePayment = async (req, res) => {
  try {
    const { paymentIntentId, amount, status } = req.body;

    if (!paymentIntentId || !amount || !status) {
      return res.status(400).json({ error: "Missing payment details" });
    }

    const existingPayment = await Payment.findOne({ paymentIntentId });
    if (existingPayment) {
      return res.status(200).json({
        message: "Payment already exists",
        payment: existingPayment,
      });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({ error: "Payment not successful" });
    }

    const charge = paymentIntent?.charges?.data?.[0];
    const customerName = charge?.billing_details?.name || "";
    const billingAddress = charge?.billing_details?.address || {};
    const receiptEmail = charge?.receipt_email;

    const payment = await Payment.create({
      paymentIntentId,
      amount,
      actualAmount: paymentIntent.amount / 100,
      status: paymentIntent.status,
      currency: paymentIntent.currency,
      user: req.user?._id || null,
      customerName,
      billingAddress: {
        line1: billingAddress.line1 || "",
        city: billingAddress.city || "",
        postalCode: billingAddress.postal_code || "",
        country: billingAddress.country || "",
      },
      stripeData: {
        created: paymentIntent.created,
        description: paymentIntent.description,
        receiptEmail,
      },
    });

    // Update user's hasPaid field
    if (req.user?._id) {
      await User.findByIdAndUpdate(req.user._id, { hasPaid: true });
      console.log("has paid:" )
    }

    console.log("Payment saved:", payment._id);
    res.status(200).json({
      message: "Payment saved successfully",
      payment: {
        id: payment._id,
        amount: payment.amount,
        status: payment.status,
        hasPaid: payment.hasPaid,
        createdAt: payment.createdAt,
      },
    });
  } catch (err) {
    console.error("Save Payment Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Get User Payments
export const getUserPayments = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const payments = await Payment.find({ user: userId })
      .sort({ createdAt: -1 })
      .select("-stripeData");

    res.status(200).json({ payments });
  } catch (err) {
    console.error("Get Payments Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};
