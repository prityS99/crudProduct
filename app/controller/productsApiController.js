const Products = require("../models/products");

class ProductsApiController {
  async createProduct (req, res) {
    console.log(req.body);
    try {
      const { name, size, color, image, desc, category } = req.body;
      const data = new Products({ 
        name,
        size, 
        color, 
        image, 
        desc, 
        category
      });
      const products = await data.save();

      return res.status(201).json({
        success: true,
        message: "Products created successfully",
        data: products,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getProduct (req, res) {
    try {
      const data = await Products.find();
      return res.status(201).json({
        success: true,
        message: "Product List",
        total: data.length,
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

    async getEditProduct ( req, res) {
    try {
      const id = req.params.id;
      const data = await Products.findById(id);
      return res.status(200).json({
        success: true,
        message: "Get product",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateProduct(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Product id is required",
        });
      }

      const data = await Products.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json({
        success: true,
        message: "Products updated successfully",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  
  async deleteProduct (req, res) {
    try {
      const id = req.params.id;
      const data = await Products.findByIdAndDelete(id)
        if (!data) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
      return res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }




}

module.exports = new ProductsApiController();