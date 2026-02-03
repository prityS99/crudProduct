import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  Paper,
  Typography,
  IconButton,
  Box,
  Divider,
  Button,
  Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = () => {
  const cartRef = useRef(null);

  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 2999,
      qty: 1,
      image: "https://via.placeholder.com/80",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 4999,
      qty: 2,
      image: "https://via.placeholder.com/80",
    },
  ]);

  useEffect(() => {
    cartRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart]
  );

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart]
  );

  return (
    <Paper
      ref={cartRef}
      sx={{
        p: 3,
        m: 3,
        borderRadius: 4,
        background: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="h6" fontWeight={600} gutterBottom>
        🛒 Your Cart ({totalItems} item{totalItems !== 1 && "s"})
      </Typography>

      {cart.length === 0 ? (
        <Typography color="text.secondary">
          Your cart is empty.
        </Typography>
      ) : (
        <>
          {cart.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                p: 2,
                borderRadius: 3,
                background: "rgba(255,255,255,0.6)",
              }}
            >
              {/* Image */}
              <Avatar
                src={item.image}
                variant="rounded"
                sx={{ width: 64, height: 64, mr: 2 }}
              />

              {/* Details */}
              <Box sx={{ flex: 1 }}>
                <Typography fontWeight={500}>{item.name}</Typography>
                <Typography color="text.secondary">
                  ₹{item.price}
                </Typography>
              </Box>

              {/* Quantity */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton onClick={() => decreaseQty(item.id)}>
                  <RemoveIcon />
                </IconButton>

                <Typography sx={{ mx: 1 }}>{item.qty}</Typography>

                <IconButton onClick={() => increaseQty(item.id)}>
                  <AddIcon />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() => removeItem(item.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          ))}

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" align="right">
            Total: ₹{totalPrice}
          </Typography>

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              py: 1.2,
              borderRadius: 3,
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
            }}
          >
            Proceed to Checkout
          </Button>
        </>
      )}
    </Paper>
  );
};

export default Cart;
