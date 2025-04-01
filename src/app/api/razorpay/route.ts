import type { NextApiRequest, NextApiResponse } from "next";
import Razorpay from "razorpay";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const options = {
      amount: req.body.amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error creating Razorpay order", error });
  }
}
