import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { deleteProduct, getProducts } from "../services/productServices";

export const productSchema = yup.object({
  name: yup.string().required("Name is required"),
  size: yup.string().required("Size is required"),
  color: yup.string().required("Color is required"),
  category: yup.string().required("Category is required"),
  image: yup
    .string()
    .url("Enter a valid image URL")
    .required("Image is required"),
  desc: yup.string().required("Description is required"),
});

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await getProducts();
    setProducts(res.data.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  return (
    <div>
      <h2>Product List</h2>

      {products.map((item) => (
        <div
          key={item._id}
          style={{
            border: "1px solid #ccc",
            margin: 10,
            padding: 10,
          }}
        >
          <img src={item.image} alt={item.name} width="120" />
          <h3>{item.name}</h3>

          <p><b>Category:</b> {item.category}</p>
          <p><b>Size:</b> {item.size}</p>
          <p><b>Color:</b> {item.color}</p>
          <p>{item.desc}</p>

          <button onClick={() => navigate(`/edit-product/${item._id}`)}>
            Edit
          </button>

          <button
            onClick={() => handleDelete(item._id)}
            style={{ marginLeft: 10 }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
