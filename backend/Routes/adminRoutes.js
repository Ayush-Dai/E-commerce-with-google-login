const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/admin', authMiddleware, adminMiddleware, (req, res) => {
  res.json({
    success: true,
    isAdmin: true,
    message: 'welcome to admin page🙏',
  });
});

module.exports = router;
