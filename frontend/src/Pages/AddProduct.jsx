// import React from "react";
// import { Box, Typography } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { createProduct } from "../services/productServices";
// import ProductForm from "./ProductForm";

// const AddProduct = () => {
//   const navigate = useNavigate();

//   const initialValues = {
//     name: "",
//     size:"",
//     color:"",
//     image: "",
//     desc: "",
//     category: "",
//   };

//   const handleSubmit = async (data) => {
//     try {
//       await createProduct(data);
//       navigate("/");
//     } catch (error) {
//       console.error("Failed to add product", error);
//     }
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h5" sx={{ mb: 2 }}>
//         Add Product
//       </Typography>

//       <ProductForm
//         initialValues={initialValues}
//         onSubmit={handleSubmit}
//       />
//     </Box>
//   );
// };

// export default AddProduct;


import React from "react";
import { Box, Typography, Container, Paper, IconButton, Tooltip, Breadcrumbs, Link } from "@mui/material";
import { useNavigate} from "react-router-dom";
import { ArrowBackIosNewRounded, Inventory2Rounded } from "@mui/icons-material";
import { createProduct } from "../services/productServices";
import ProductForm from "./ProductForm";

const AddProduct = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    size: "",
    color: "",
    image: "",
    desc: "",
    category: "",
    price: "", // Added price to match your service logic
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
    <Box 
      sx={{ 
        minHeight: "100vh", 
        bgcolor: "#F4F7F9", 
        py: { xs: 4, md: 8 },
        px: 2 
      }}
    >
      <Container maxWidth="sm">
        {/* TOP NAVIGATION / BREADCRUMBS */}
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Tooltip title="Back to Dashboard">
            <IconButton 
              onClick={() => navigate("/")}
              sx={{ 
                bgcolor: "white", 
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                "&:hover": { bgcolor: "#6366F1", color: "white" }
              }}
            >
              <ArrowBackIosNewRounded sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
          <Box>
             <Typography variant="h5" sx={{ fontWeight: 800, color: "#0F172A", lineHeight: 1.2 }}>
              New Product
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Fill in the details to add an item to inventory
            </Typography>
          </Box>
        </Box>

        {/* FORM CONTAINER */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: "24px",
            border: "1px solid #E5EAF2",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.02)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* Subtle Decorative Icon */}
          <Inventory2Rounded 
            sx={{ 
              position: "absolute", 
              top: -20, 
              right: -20, 
              fontSize: 120, 
              color: "#F1F5F9", 
              zIndex: 0 
            }} 
          />

          <Box sx={{ position: "relative", zIndex: 1 }}>
            <ProductForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
              // If your ProductForm has a cancel button, you can pass navigate
              onCancel={() => navigate("/")} 
            />
          </Box>
        </Paper>

        {/* FOOTER HINT */}
        <Typography 
          variant="caption" 
          display="block" 
          textAlign="center" 
          sx={{ mt: 4, color: "#94A3B8", fontWeight: 500 }}
        >
          All fields are synchronized with the central warehouse database.
        </Typography>
      </Container>
    </Box>
  );
};

export default AddProduct;
