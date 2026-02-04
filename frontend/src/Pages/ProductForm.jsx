import React, { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import { productSchema } from "../validations";


const ProductForm = ({ initialValues, onSubmit }) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  // Important for EDIT form
  useEffect(() => {
    setFormData(initialValues);
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await productSchema.validate(formData, { abortEarly: false });
      setErrors({});
      onSubmit(formData);
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 500, mx: "auto", mt: 4 }}
    >
      <TextField
        fullWidth
        margin="normal"
        label="Name"
        name="name"
        value={formData.name || ""}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Size"
        name="size"
        value={formData.size || ""}
        onChange={handleChange}
        error={!!errors.size}
        helperText={errors.size}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Color"
        name="color"
        value={formData.color || ""}
        onChange={handleChange}
        error={!!errors.color}
        helperText={errors.color}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Category"
        name="category"
        value={formData.category || ""}
        onChange={handleChange}
        error={!!errors.category}
        helperText={errors.category}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Image URL"
        name="image"
        value={formData.image || ""}
        onChange={handleChange}
        error={!!errors.image}
        helperText={errors.image}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Description"
        name="desc"
        multiline
        rows={3}
        value={formData.desc || ""}
        onChange={handleChange}
        error={!!errors.desc}
        helperText={errors.desc}
      />

      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Save Product
      </Button>
    </Box>
  );
};

export default ProductForm;
