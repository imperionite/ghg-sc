import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AppRoutes from "./routes/AppRoutes";

const theme = createTheme({
  palette: {
    primary: { main: "#1e293b" },
    secondary: { main: "#059669" },
    background: { default: "#f8fafc", paper: "#ffffff" },
  },
  typography: { fontFamily: "Inter, Roboto, sans-serif" },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
