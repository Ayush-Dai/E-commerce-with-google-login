const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const signUpController = async (req, res) => {
    try {
        console.log("Received Request Body:", req.body);
        //get the user data
        const { name, email, password } = req.body;
        // check if the user exists or not
        const userInfo = await User.findOne({ email });

        if (userInfo) {
            return   res.status(400).json({
                message: "User alreddy exists",
                success: false,
                SignUped:true
            })
        }

        //hash the password
        const Salt =await bcrypt.genSalt(10);
        const hashPassword =await bcrypt.hash(password, Salt);

        //store in the database
        const user =  new User({
            name,
            email,
            password: hashPassword,
           
          
        });

        await user.save();
        if (user) {
            res.status(201).json({
                message: "Registration successful!",
                success: true
            })
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server Error! Please try again"
        })
    }
}

module.exports = signUpController;