import categoryModel from '../models/categoryModel.js';
import slugify from 'slugify';

export const createCategoryController = async (req, res) => {
  try {
    console.log(req.body);
    const { name } = req.body;
    if (!name) {
      res.status(400).send({
        success: false,
        message: 'Name is required',
      });
    }

    // Checking if the category already exists
    const existingCategory = await categoryModel.findOne({ name });

    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: `Category named ${name} already exists`,
      });
    }

    // Adding category to the Db is it doesnot exists
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();

    res.status(201).send({
      success: true,
      message: `Category added successfully`,
      category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: `Failed to add category`,
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    if (!name) {
      res.status(401).send({
        success: false,
        message: 'Name is required',
      });
    }
    // updating category
    const updateCategory = await categoryModel.findByIdAndUpdate(
      id,
      {
        name: name,
        slug: slugify(name),
      },
      {
        new: true,
      }
    );
    res.status(200).send({
      success: true,
      message: `Category updated successfully`,
      updateCategory,
    });
  } catch (error) {
    console.error(error);
    request.send(404).send({
      success: false,
      message: `Category cannot be updated`,
      error,
    });
  }
};

export const getAllCategoriesController = async (req, res) => {
  try {
    const allCategory = await categoryModel.find({});
    if (!allCategory) {
      res.status(200).send({
        success: true,
        message: `There is no category avaialble`,
      });
    }
    res.status(200).send({
      success: true,
      allCategory,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: `Cannot fetch all categories`,
    });
  }
};

//Delete category controller

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;

    // deleting category
    await categoryModel.findByIdAndRemove(id, {
      new: true,
    });
    res.status(200).send({
      success: true,
      message: `Category deleted successfully`,
    });
  } catch (error) {
    console.error(error);
    request.send(404).send({
      success: false,
      message: `Category cannot be updated`,
      error,
    });
  }
};

export const getSpecificCategory = async (req, res) => {
  try {
    const { slug } = req.params;

    const category = await categoryModel.findOne({ slug: slug });

    if (!category) {
      res.status(404).send({
        success: false,
        message: 'Category not found',
      });
    }
    res.status(200).send({
      success: true,
      category,
    });
  } catch (error) {
    console.error(error);
    res.status(402).send({
      success: false,
      error,
    });
  }
};
