import React from "react";
import { Box, Typography } from "@mui/material";
import { createProduct } from "../services/productService";
import ProductForm from "./ProductForm";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    size:"",
    color:"",
    image: "",
    desc: "",
    category: "",
  };

  const handleSubmit = async (data) => {
    try {
      await createProduct(data);
      navigate("/");
    } catch (error) {
      console.error("Failed to add product", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Add Product
      </Typography>

      <ProductForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default AddProduct;
