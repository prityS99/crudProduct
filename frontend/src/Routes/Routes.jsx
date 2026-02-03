import ProductList from "../Pages/ProductList";

const { createBrowserRouter } = require("react-router-dom");






const Routes = createBrowserRouter([
    {
        path: "/",
        element:<ProductList/>
        
    }
])



export default Routes