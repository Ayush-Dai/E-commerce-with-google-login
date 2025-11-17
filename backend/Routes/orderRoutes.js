const express = require('express');
const router = express.Router();
const { createOrder, getAllOrder, getOrderById } = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.post('/createOrder', authMiddleware, createOrder);
router.get('/getallorder', authMiddleware, adminMiddleware, getAllOrder);
router.get('/getorderbyid/:id', authMiddleware, getOrderById);

module.exports = router;
