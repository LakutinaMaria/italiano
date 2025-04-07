import "./App.css";
import { AuthWrapper } from "./auth/AuthWrapper.tsx";
import { BrowserRouter } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthWrapper />
      </BrowserRouter>
    </div>
  );
};

export default App;