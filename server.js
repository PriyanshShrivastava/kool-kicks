import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import JWT from 'jsonwebtoken';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import paymentRoute from './routes/paymentRoute.js';
import cors from 'cors';
import Razorpay from 'razorpay';
// import path from 'path';
// import { fileURLToPath } from 'url';

// express call
const app = express();

//es module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Databse connection
connectDB();

//Routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api', paymentRoute);

//getting api key for the razorpay
app.get('/api/getkey', (req, res) => {
  res.status(200).json({
    key: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_APT_SECRET,
  });
});


//For page not found redirection
// app.use('*', function (req, res) {
//   res.sendFile(path.join(__dirname, './client/dist/index.html'));
// });

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

const PORT = process.env.PORT || 8080;

// server Listening
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
