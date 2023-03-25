import express from 'express';
import {
  checkout,
  paymentVerification,
} from '../controllers/paymentController.js';
import { loginTokenCheck } from '../middlewares/authMiddleWare.js';

const router = express.Router();

//payment route
router.post('/checkout', checkout);

//payment verification route
router.post('/paymentverification', paymentVerification);
export default router;
