import { ThemeProvider } from "@emotion/react";
import "./App.css";
import { CssBaseline } from "@mui/material";
import Theme from "./theme/theme";
import ProductList from "./Pages/ProductList";

function App() {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        
        <ProductList/>
      </ThemeProvider>
    </>
  );
}

export default App;
