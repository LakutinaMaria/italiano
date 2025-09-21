import { LoginForm } from "../components/pages/login/LoginForm.tsx";
import { HomePage } from "../components/pages/homePage/HomePage.tsx";
import { Routes, Route, Navigate } from "react-router-dom";
import "./AuthWrapper.css";
import { Account } from "../components/pages/account/Account.tsx";
import { Books } from "../components/pages/books/Books.tsx";
import { Lessons } from "../components/pages/lessons/Lessons.tsx";
import { Words } from "../components/pages/words/Words.tsx";
import { LayoutWrapper } from "../components/layout/LayoutWrapper.tsx";

export const AuthWrapper = () => {
  const handleLogin = async (userName: string, password: string) => {
    // TODO: Implement login logic
    console.log("Login attempt:", userName, password);
  };

  const handleRegister = async (
    userName: string,
    email: string,
    password: string
  ) => {
    // TODO: Implement registration logic
    console.log("Registration attempt:", userName, email, password);
  };

  return (
    <Routes>
      {/* Login route without layout */}
      <Route
        path="/login"
        element={
          <LoginForm onLogin={handleLogin} onRegister={handleRegister} />
        }
      />

      {/* All other routes with persistent layout */}
      <Route
        path="/*"
        element={
          <LayoutWrapper>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<HomePage />} />
              <Route path="/lessons" element={<Lessons />} />
              <Route path="/words" element={<Words />} />
              <Route path="/books" element={<Books />} />
              <Route path="/account" element={<Account />} />
              {/* Redirect unknown paths to dashboard */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </LayoutWrapper>
        }
      />
    </Routes>
  );
};
