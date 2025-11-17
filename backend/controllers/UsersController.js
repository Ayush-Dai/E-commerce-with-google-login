const User = require('../models/userModel');

const getUsers = async (req, res) => {
  try {
    const Users = await User.find({}, '-password');

    if (Users.length > 0) {
      res.status(200).json({
        success: true,
        Users,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'No users found',
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: 'Server Error! Please try again',
    });
  }
};

const deleteUsers = async (req, res) => {
  try {
    const getCurrentUserId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(getCurrentUserId);
    if (!deletedUser) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong! Please try again',
    });
  }
};

module.exports = { getUsers, deleteUsers };
