const { oauth2client } = require('../Config/googleConfig');
const User = require('../models/userModel');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const googleLoginController = async (req, res) => {
  try {
    const { code } = req.query;
    const googleRes = await oauth2client.getToken(code);
    oauth2client.setCredentials(googleRes.tokens);

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`,
    );
    const { email, name, picture } = userRes.data;
    let user = await User.findOne({ email });

    if (!user) {
      user = await new User({
        name,
        email,
        image: picture,
      });
      await user.save();
    }
    const { _id } = user;
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_TIMEOUT },
    );

    const cookieOptions = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      // expires: new Date(Date.now() + 5 * 60 * 1000),
      httpOnly: true,
      priority: 'high', // Ensures priority handling,
      path: '/',
    };

    // Set secure flag in production
    if (process.env.NODE_ENV === 'production') {
      cookieOptions.secure = true; // Only sent over HTTPS
      cookieOptions.sameSite = 'lax'; // Allows Google OAuth redirection
    }

    user.password = undefined;

    res.cookie('jwtPrac', token, cookieOptions);

    console.log(res.get('Set-Cookie'));

    return res.status(200).json({
      message: 'success',
      // token,
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

const signInController = async (req, res) => {
  try {
    console.log('data', req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: 'Please Sign Up first!',
        success: false,
      });
    }

    const userData = user.toObject(); // Convert Mongoose document to plain object
    const { role, name, image } = userData;

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(400).json({
        message: 'Incorrect Password',
        success: false,
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_TIMEOUT },
    );

    const cookieOptions = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      path: '/',
    };

    // Set secure flag in production
    if (process.env.NODE_ENV === 'production') {
      cookieOptions.secure = true; // Only sent over HTTPS
      cookieOptions.sameSite = 'strict'; // Protection against CSRF
    }

    user.password = undefined;
    res.cookie('jwtPrac', token, cookieOptions);

    res.status(200).json({
      message: 'success',
      // token,
      user: { _id: user._id, email: user.email, role, name, image },
    });

    console.log(user);
  } catch (err) {
    console.error('Error in signInController:', err);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

const changePasswordController = async (req, res) => {
  try {
    console.log('Controller - req.user:', req.user);
    const userId = req?.user._id;
    const { oldpassword, password } = req.body;
    //find the current logged in user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        messasge: 'User not found',
      });
    }

    if (!oldpassword) {
      return res.status(400).json({
        success: false,
        message: 'Old password is required!!',
      });
    }

    //check if the old password is correct
    const isPasswordMatch = await bcrypt.compare(oldpassword, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: 'Old password is incorrect',
      });
    }
    //hash the new password
    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(password, salt);

    //update user password
    user.password = newHashedPassword;
    await user.save();

    return res.status(201).json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Some error occured ! Please try again',
    });
  }
};

module.exports = { googleLoginController, changePasswordController, signInController };
