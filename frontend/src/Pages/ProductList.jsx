import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Grid,
  Container,
  Snackbar,
  Alert,
  Box,
  IconButton,
  Chip,
  InputBase,
  Paper,
  Tooltip,
} from "@mui/material";
import { 
  DeleteOutline, 
  EditOutlined, 
  AddRounded, 
  SearchRounded, 
  FilterListRounded,
  Inventory2Outlined 
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import {
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../services/productServices";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [toast, setToast] = useState({ open: false, msg: "", type: "success" });
const [searchQuery, setSearchQuery] = useState("");


const fetchProducts = async () => {
  try {
    const res = await getProducts();
    
    // Check if res.data.data exists (because your backend sends it that way)
    if (res.data && res.data.data) {
      setProducts(res.data.data); 
    } else {
      setProducts([]);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    setProducts([]); 
  }
};

  useEffect(() => { fetchProducts(); }, []);

  const handleSubmit = async (data) => {
    try {
      if (editData) {
        await updateProduct(editData._id, data);
        setToast({ open: true, msg: "Updated successfully", type: "success" });
      } else {
        await createProduct(data);
        setToast({ open: true, msg: "Added successfully", type: "success" });
      }
      setOpenForm(false);
      fetchProducts();
    } catch (error) {
      setToast({ open: true, msg: "Request failed", type: "error" });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      await deleteProduct(id);
      setToast({ open: true, msg: "Product removed", type: "info" });
      fetchProducts();
    }
  };

  const filteredProducts = products.filter((item) =>
  item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  item.category.toLowerCase().includes(searchQuery.toLowerCase())
);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#F4F7F9' }}>
      
      {/* MINIMALIST NAV */}
      <AppBar position="fixed" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid #E5EAF2' }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Inventory2Outlined sx={{ color: '#6366F1' }} />
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#1E293B', letterSpacing: '-0.5px' }}>
                Inventory.
              </Typography>
            </Box>

            {/* INTEGRATED SEARCH BAR */}
            <Paper
              elevation={0}
              sx={{ 
                p: '2px 12px', display: 'flex', alignItems: 'center', width: 400, 
                bgcolor: '#F1F5F9', borderRadius: '12px', mx: 4
              }}
            >
              <SearchRounded sx={{ color: '#94A3B8', fontSize: 20 }} />
              <InputBase sx={{ ml: 1, flex: 1, fontSize: '0.9rem' }} placeholder="Search products..." value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)} />
            </Paper>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton sx={{ color: '#64748B' }}><FilterListRounded /></IconButton>
              <Button 
                variant="contained" 
                startIcon={<AddRounded />}
                onClick={() => { setEditData(null); setOpenForm(true); }}
                sx={{ 
                  borderRadius: '10px', textTransform: 'none', fontWeight: 600, 
                  bgcolor: '#6366F1', '&:hover': { bgcolor: '#4F46E5' } 
                }}
              >
                Create
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* MAIN CONTENT */}
      <Container maxWidth="xl" sx={{ mt: 12, mb: 6, flex: 1 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A' }}>Global House Overview</Typography>
          {/* <Typography variant="body1" color="text.secondary">Manage your stock items </Typography> */}
        </Box>
        
        <Grid container spacing={4}>
          {products?.map((item) => (
            <Grid item xs={12} sm={6} lg={3} key={item._id}>
              <Card 
                elevation={0}
                sx={{ 
                  borderRadius: '20px', 
                  bgcolor: 'white',
                  border: '1px solid #E5EAF2',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  overflow: 'hidden',
                  '&:hover': { 
                    borderColor: '#6366F1',
                    transform: 'scale(1.02)',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)'
                  }
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={item.image || 'https://via.placeholder.com/400'}
                    alt={item.name}
                    sx={{ filter: 'brightness(0.95)' }}
                  />
                  <Chip 
                    label={item.category} 
                    size="small"
                    sx={{ 
                      position: 'absolute', top: 12, left: 12, 
                      bgcolor: 'rgba(255,255,255,0.9)', fontWeight: 700, fontSize: '0.65rem' 
                    }} 
                  />
                </Box>

                <CardContent sx={{ pt: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem', mb: 0.5 }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, height: 40, overflow: 'hidden' }}>
                    {item.desc}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>Price</Typography>
                      <Typography variant="h6" sx={{ color: '#10B981', fontWeight: 800 }}>${item.price || '0.00'}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>Size/Col</Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{item.size} • {item.color}</Typography>
                    </Box>
                  </Box>
                </CardContent>

                <Box sx={{ p: 2, display: 'flex', gap: 1, borderTop: '1px solid #F1F5F9', bgcolor: '#F8FAFC' }}>
                  <Tooltip title="Edit Product">
                    <Button 
                      fullWidth 
                      size="small" 
                      onClick={() => { setEditData(item); setOpenForm(true); }}
                      sx={{ borderRadius: '8px', color: '#6366F1', bgcolor: '#EEF2FF', fontWeight: 600 }}
                    >
                      Edit
                    </Button>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton 
                      size="small" 
                      onClick={() => handleDelete(item._id)}
                      sx={{ color: '#EF4444', bgcolor: '#FEF2F2', borderRadius: '8px' }}
                    >
                      <DeleteOutline fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* MINIMAL FOOTER */}
      <Box sx={{ py: 4, borderTop: '1px solid #E5EAF2', bgcolor: 'white', textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
          GlobalHouse System Management © {new Date().getFullYear()} — Build by Prity Sarkar
        </Typography>
      </Box>

      {/* OVERLAYS */}
      <ProductForm open={openForm} onClose={() => setOpenForm(false)} onSubmit={handleSubmit} editData={editData} />
      <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast({ ...toast, open: false })}>
        <Alert severity={toast.type} variant="filled">{toast.msg}</Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductList;