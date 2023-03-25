import { Payment } from '../models/paymentModel.js';
import { instance } from '../server.js';
import crypto from 'crypto';

export const checkout = async (req, res) => {
  const user = req?.user;
  try {
    const options = {
      amount: req?.body?.amount * 100,
      currency: 'INR',
    };
    const order = await instance.orders.create(options);

    res.status(200).send({
      success: true,
      order,
      user,
    });
  } catch (error) {
    console.error(error);
  }
};

// Verifying payment controller

export const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req?.body;

  const body = razorpay_order_id + '|' + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest('hex');

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
  } else {
    res.status(400).json({
      success: false,
    });
  }
};
