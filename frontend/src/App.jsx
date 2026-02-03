import { ThemeProvider } from "@emotion/react";
import "./App.css";
import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import Routes from "./Routes/Routes";
import Theme from "./theme/theme";

function App() {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <RouterProvider router={Routes} />
      </ThemeProvider>
    </>
  );
}

export default App;
