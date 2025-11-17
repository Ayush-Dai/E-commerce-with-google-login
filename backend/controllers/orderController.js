const Order = require('../models/OrderModel');

const createOrder = async (req, res) => {
  try {
    const { user, products, totalAmount } = req.body;
    if ((!user, !products, !totalAmount)) {
      return res.status(400).json({
        message: 'Missing required fields',
      });
    }

    const order = new Order({
      user,
      products,
      totalAmount,
    });

    const saveOrder = await order.save();
    if (saveOrder) {
      res.status(201).json({
        success: true,
        message: 'Ordered Successfully',
        saveOrder,
      });
    } else {
      res.status(404).json({
        success: false,
        messsage: 'Error while Ordering',
      });
    }
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('products.product');

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No orders found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully',
      orders,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const userId = req.params.id;
    const findById = await Order.find({ user: userId })
      .populate('user')
      .populate('products.product');

    if (!findById || findById.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No orders found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully',
      findById,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

module.exports = { createOrder, getAllOrder, getOrderById };
