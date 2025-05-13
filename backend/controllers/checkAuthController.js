const checkAuthController=(req,res)=>{
    res.status(200).json({
        success: true,
        message: 'User is authenticated',
        user: req.user, // Send back the current user data (optional)
    });
}

module.exports= checkAuthController;