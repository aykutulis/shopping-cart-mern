import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

const createOrder = asyncHandler(async (req, res, next) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) throw new Error('No order items');

  const order = new Order({
    user: req.user,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  });

  const createdOrder = await order.save();

  res.status(201).json(createOrder);
});

export { createOrder };
