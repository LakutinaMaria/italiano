import "./App.css";
import { AuthWrapper } from "./auth/AuthWrapper";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthWrapper />
      </BrowserRouter>
    </div>
  );
}

export default App;
