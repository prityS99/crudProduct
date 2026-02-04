import { createBrowserRouter } from "react-router-dom"
import ProductList from "../Pages/ProductList"
import AddProduct from "../Pages/AddProduct"
import Cart from "../Pages/Cart"
import Wrapper from "../Layout/Wrapper"



const Routes = createBrowserRouter([
         {
        path: "",
        element: <Wrapper />,
        children: [
          {
            path: "products",
            element: <ProductList />,
          },
          {
            path: "addproduct",
            element: <AddProduct />,
          },
           {
            path: "cart",
            element: <Cart />,
          },
        ],
      },
])



export default Routes