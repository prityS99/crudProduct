const mongoose = require('mongoose');

const Schema = mongoose.Schema


const ProductSchema = new Schema(
    {
    name: {
      type: String,
      required: true,
     
    },

    size: {
      type: [String],
      required: true,
    },

    color: {
      type: [String],
      required: true,
    },

    image: {
      type: String,
      default: "default-product.png",
    },

    desc: {
      type: String,
    },

    category: {
      type: String,
      required: true,
    },
})

const ProductModel = mongoose.model("product", ProductSchema);

module.exports = ProductModel