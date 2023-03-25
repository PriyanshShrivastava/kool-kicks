import express from 'express';
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoriesController,
  getSpecificCategory,
  updateCategoryController,
} from '../controllers/categoryController.js';
import { isAdmin, loginTokenCheck } from '../middlewares/authMiddleWare.js';

//Creating ctagory router
const router = express.Router();

//create category route
router.post(
  '/create-category',
  loginTokenCheck,
  isAdmin,
  createCategoryController
);

//update category route
router.put(
  '/update-category/:id',
  loginTokenCheck,
  isAdmin,
  updateCategoryController
);

// get specific category
router.get('/single-category/:slug', loginTokenCheck, getSpecificCategory);

//get-all category route
router.get('/categories', getAllCategoriesController);

//delete category route
router.delete(
  '/delete-category/:id',
  loginTokenCheck,
  isAdmin,
  deleteCategoryController
);

export default router;
