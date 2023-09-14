import Login from "./containers/Login";
import NavBar from "./containers/Navbar";
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
          <Route
            path="/dashboard"
            element={
              <NavBar>
                <Dashboard />
              </NavBar>
            }
          />
        </Routes>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
