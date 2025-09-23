import "./App.css";
import { AuthWrapper } from "./auth/AuthWrapper.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "./theme/theme";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <BrowserRouter>
          <AuthWrapper />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
};

export default App;