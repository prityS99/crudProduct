
import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();

  const navItems = [
    { text: "Product List", path: "/products" },
    { text: "Add Product", path: "/addproduct" },
  ];

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List sx={{ width: 250 }}>
        {navItems.map((item, index) => (
          <ListItemButton
            key={index}
            onClick={() => {
              navigate(item.path);
              onClose();
            }}
          >
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
