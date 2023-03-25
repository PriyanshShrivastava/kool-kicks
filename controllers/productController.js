import productModel from '../models/productModel.js';
import slugify from 'slugify';
import fs from 'fs';

// Create product handler
export const createProductController = async (req, res) => {
  try {
    const { name, description, category, quantity, price } = req.fields;
    const { image } = req.files;

    console.log(req.fields);
    switch (true) {
      case !name:
        return res
          .status(500)
          .send({ success: false, error: `Name is required` });
        break;
      case !price:
        return res
          .status(500)
          .send({ success: false, error: `Name is required` });
        break;
      case !description:
        return res
          .status(500)
          .send({ success: false, error: `description is required` });
        break;
      case !category:
        return res
          .status(500)
          .send({ success: false, error: `category is required` });
        break;
      case !quantity:
        return res
          .status(500)
          .send({ success: false, error: `quantity is required` });
        break;
      case !image && image.size > 100000:
        return res
          .status(500)
          .send({ success: false, error: `shipping detail is required` });
        break;
      default:
        console.log('Default reached');
    }

    const product = new productModel({
      ...req.fields,
      slug: slugify(req.fields.name),
    });

    if (image) {
      product.image.data = fs.readFileSync(image.path);
      product.image.contentType = image.type;
    }

    await product.save();

    res.status(201).send({
      success: true,
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
    });
  }
};

// Update product handler
export const updateProductController = async (req, res) => {
  let updatedProduct;
  try {
    const { id } = req.params;

    if (req.body.name) {
      updatedProduct = await productModel.findByIdAndUpdate(
        id,
        {
          ...req.body,
          slug: slugify(req.body.name),
        },
        { new: true }
      );
    } else {
      updatedProduct = await productModel.findByIdAndUpdate(
        id,
        {
          ...req.body,
        },
        { new: true }
      );
    }

    console.log(req.body);
    res.status(200).send({
      success: true,
      message: 'Product updated successfully',
      updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
    });
  }
};

// Get specific product
export const getSpecificProduct = async (req, res) => {
  try {
    const { slug } = req.params;

    const product = await productModel
      .findOne({ slug: slug })
      .select('-image')
      .populate('category');

    if (!product) {
      res.status(404).send({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).send({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Something went wrong',
    });
  }
};

// Get all products
export const getAllProductsController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate('category')
      .select('-image')
      .limit(20)
      .sort({ price: 'desc' });

    if (!products) {
      res.status(404).send({
        success: false,
        message: 'No product available',
      });
    }

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ sucess: false, error });
  }
};

// Delete specific product
export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;

    await productModel.findByIdAndRemove({ _id: id });

    const products = await productModel.find({});
    res.status(200).send({ sucess: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).send({ sucess: false, error });
  }
};

// get Product image
export const productImageController = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productModel.findById(pid).select('image');

    if (product?.image?.data) {
      res.set({ 'Content-Type': product?.image?.contentType });
      return res.status(200).send(product?.image?.data);
    }
  } catch (error) {}
};

// Filtering Products based on category
export const productFilterController = async (req, res) => {
  try {
    console.log(req.body);
    const { checked } = req.body;
    console.log('checking..', checked);
    let args = {};
    if (checked.length > 0) {
      args.category = checked;
    }

    console.log(args);
    const products = await productModel.find(args).sort({ price: 'desc' });

    res.status(200).send({
      success: true,
      message: 'Product filtered successfully',
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
    });
  }
};
