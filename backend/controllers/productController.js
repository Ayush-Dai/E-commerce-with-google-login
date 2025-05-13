const Product = require('../models/productModel');

const fs = require('fs');


const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        if (products) {
            res.status(200).json({
                success: true,
                products
            })
        } else {
            res.status(404).json({
                success: false,
                message: "Products not found"
            })
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Server Error! Please try again"
        })
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.status(200).json({
                success: true,
                product
            })
        } else {
            res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Server Error! Please try again"
        })
    }
}


const createProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const imageUrl = req.file
            ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
            : null;


        const product = await Product.create({
            name,
            description,
            price,
            imageUrl
        });

        if (product) {
            res.status(201).json({
                success: true,
                product
            });
        } else {
            res.status(400).json({
                success: false,
                messasge: "Product not created"
            })
        }

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Server error ! Please try again"
        })
    }
}

const editProduct = async (req, res) => {
    try {
        const updatedProductData = req.body;
        const getCurrentProductId = req.params.id;
        const updateProduct = await Product.findByIdAndUpdate(
            getCurrentProductId,
            updatedProductData,
            { new: true }
        );
        if (!updateProduct) {
            res.status(404).json({
                success: false,
                message: 'Product is not found with this Id'
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'Product updated successfully',
                data: updateProduct, // ✅ Fixed here
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong! Please try again'
        });
    }
};

const deleteProduct=async(req,res)=>{
try {
        const getCurrentProductId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(getCurrentProductId);
        if (!deletedProduct) {
            res.status(404).json({
                success: false,
                message: 'Product is not found with this Id'
            });
        } else {
            res.status(200).json({
                success: true,
                data: deletedProduct,
                messasge:"Product deleted successfully"
            
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong! Please try again'
        })
    }
}



module.exports = {
    getProducts,
    getProductById,
    createProduct,
    editProduct,
    deleteProduct
}