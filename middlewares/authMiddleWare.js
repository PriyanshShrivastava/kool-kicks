import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

// Protecting routes on basis of token check
export const loginTokenCheck = (req, res, next) => {
  try {
    const token = req?.headers?.authorization;
    const getVerfication = JWT.verify(token, process.env.JWT_SECRET);
    // Confirming that the req gets the id
    req.user = getVerfication;
    next();
  } catch (error) {
    console.error(error);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    // Getting user Id
    const userId = await userModel.findById(req.user._id);
    if (userId.role !== 1) {
      return res.status(401).send({
        success: false,
        message: 'Unauthorized user',
      });
    } else {
      next();
    }
  } catch (error) {}
};
