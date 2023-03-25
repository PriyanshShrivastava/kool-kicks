import express from 'express';
import {
  registerUser,
  loginUser,
  forgetpasswordController,
  updateUserController,
  getOrderController,
} from '../controllers/registerUserController.js';
import { isAdmin, loginTokenCheck } from './../middlewares/authMiddleWare.js';
// Router
const router = express.Router();

//Routing to register user
router.post('/register', registerUser);

//Routing to login user
router.post('/login', loginUser);

//Forget passsword route
router.post('/forget-password', forgetpasswordController);

// Protected route
router.get('/user-auth', loginTokenCheck, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

// Admin auth protected route
router.get('/admin-auth', loginTokenCheck, isAdmin, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

//update user profile
router.put('/edit-profile', updateUserController);

//user orders
router.get('/orders', loginTokenCheck, getOrderController);

export default router;
