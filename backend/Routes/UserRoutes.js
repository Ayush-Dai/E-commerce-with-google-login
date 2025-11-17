const express = require('express');
const router = express.Router();

const { getUsers, deleteUsers } = require('../controllers/UsersController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/usersDetails', authMiddleware, adminMiddleware, getUsers);
router.delete('/userDetails/delete/:id', authMiddleware, adminMiddleware, deleteUsers);

module.exports = router;
