import express from "express";
import { createPaymentIntent, savePayment } from "../controllers/payementController.js";

const router = express.Router();

router.post("/create-payment-intent", createPaymentIntent);
router.post("/save-payment", savePayment);

export default router;
