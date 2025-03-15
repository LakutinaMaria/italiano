import { createContext, useContext, useState } from "react";
import { request, setAuthToken, setRefreshToken } from "../util/axios_helper";
import { LoginForm } from "../components/pages/login/LoginForm";
import { useNavigate } from "react-router-dom";
import { HomePage } from "../components/pages/homePage/HomePage";
import { Routes, Route, Navigate } from "react-router-dom";
import "./AuthWrapper.css";
import { Account } from "../components/pages/account/Account";
import { Books } from "../components/pages/books/Books";
import { Lessons } from "../components/pages/lessons/Lessons";
import { Words } from "../components/pages/words/Words";

const AuthContext = createContext({
  user: { name: "", isAuthenticated: false },
  login: async () => {},
  logout: () => {},
});

export const AuthData = () => useContext(AuthContext);

const ProtectedRoute = ({ children }) => {
  const { user } = AuthData();
  if (!user.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export const AuthWrapper = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser
      ? JSON.parse(storedUser)
      : { name: "", isAuthenticated: false };
  });

  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      const response = await request("POST", "/auth/login", {
        username,
        password,
      });
      retriveToken(response, username);
      navigate("/dashboard");
      return "success";
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await request("POST", "/auth/register", {
        username,
        email,
        password,
      });
      retriveToken(response, username);
      navigate("/dashboard");
      return "success";
    } catch (error) {
      console.error("Registration failed:", error);
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  };

  const logout = () => {
    setAuthToken(null);
    setUser({ name: "", isAuthenticated: false });
  };

  const retriveToken = (response, username) => {
    const { access_token, refresh_token } = response.data;
    setAuthToken(access_token);
    setRefreshToken(refresh_token);

    setUser((prevUser) => {
      const updatedUser = {
        ...prevUser,
        name: username,
        isAuthenticated: true,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Routes>
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/words" element={<Words />} />
        <Route path="/books" element={<Books />} />
        <Route path="/account" element={<Account />} />
        <Route
          path="/login"
          element={<LoginForm onLogin={login} onRegister={register} />}
        />
        <Route
          path="*"
          element={
            <Navigate to={user.isAuthenticated ? "/dashboard" : "/login"} />
          }
        />
      </Routes>
    </AuthContext.Provider>
  );
};
