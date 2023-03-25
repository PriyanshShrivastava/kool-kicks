import express from 'express';
import formidable from 'express-formidable';
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getSpecificProduct,
  productFilterController,
  productImageController,
  updateProductController,
} from '../controllers/productController.js';

import { isAdmin, loginTokenCheck } from '../middlewares/authMiddleWare.js';

//Creating ctagory router
const router = express.Router();

//create category route
router.post(
  '/create-product',
  loginTokenCheck,
  isAdmin,
  formidable(),
  createProductController
);

//update product route
router.put(
  '/update-product/:id',
  loginTokenCheck,
  isAdmin,
  updateProductController
);

// get specific product
router.get('/specific-product/:slug', getSpecificProduct);

//get-all products
router.get('/products', getAllProductsController);

//delete product route
router.delete(
  '/delete-product/:id',
  loginTokenCheck,
  isAdmin,
  deleteProductController
);

// getImage
router.get('/product-image/:pid', productImageController);

//filtered product
router.post('/product-filters', productFilterController);

export default router;
