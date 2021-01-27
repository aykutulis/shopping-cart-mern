import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import path from 'path';
import fs from 'fs';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getAllProducts = asyncHandler(async (req, res, next) => {
  const pageSize = Number(req.query.pageSize) || 8;
  const pageNumber = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Product.countDocuments(keyword);
  const pagesCount = Math.ceil(count / pageSize);

  const products = await Product.find(keyword)
    .limit(pageSize)
    .skip(pageSize * (pageNumber - 1));

  res.json({
    products,
    pageNumber,
    pagesCount,
  });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getSingleProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found.');
  }
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    const rootDir = path.resolve();

    if (product.image !== '/images/sample.jpg') {
      fs.unlink(path.join(rootDir, product.image), (err) => {
        if (err) {
          res.status(404);
          next(err);
        }
      });
    }

    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found.');
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res, next) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();

  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res, next) => {
  const { name, price, description, brand, category, countInStock } = req.body;
  const image = `/uploads/${req.savedImage}`;

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  product.name = name;
  product.price = price;
  product.description = description;
  product.brand = brand;
  product.category = category;
  product.countInStock = countInStock;
  if (req.savedImage) {
    const rootDir = path.resolve();

    if (product.image !== '/images/sample.jpg') {
      fs.unlink(path.join(rootDir, product.image), (err) => {
        if (err) {
          res.status(404);
          next(err);
        }
      });
    }

    product.image = image;
  }

  const updatedProduct = await product.save();

  res.json(updatedProduct);
});
// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res, next) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user.toString());

  if (alreadyReviewed) {
    res.status(400);
    throw new Error('Product already reviewed');
  }

  const user = await User.findById(req.user);

  const review = {
    name: user.name,
    rating: Number(rating),
    comment,
    user: user._id,
  };

  product.reviews.push(review);
  product.numReviews = product.reviews.length;
  product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

  await product.save();

  res.status(201).json({ message: 'Review added' });
});

export { getAllProducts, getSingleProduct, deleteProduct, createProduct, updateProduct, createProductReview };
