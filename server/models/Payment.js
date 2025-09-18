import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    amount: { type: Number, required: true },
    actualAmount: { type: Number }, // Optional: Stripe amount from cents
    currency: { type: String, default: "usd" },
    paymentIntentId: { type: String, required: true },
    status: { type: String, required: true },
    customerName: { type: String }, // ✅ New
    billingAddress: {
      line1: { type: String },
      city: { type: String },
      postalCode: { type: String },
      country: { type: String },
    },
    stripeData: {
      created: { type: Number },
      description: { type: String },
      receiptEmail: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
