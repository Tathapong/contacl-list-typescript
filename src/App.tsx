import Login from "./containers/Login";
import Dashboard from "./containers/Dashboard";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

function App() {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
