import { LoginForm } from "../components/pages/login/LoginForm.tsx";
import { useNavigate } from "react-router-dom";
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
      <Route
        path="/"
        element={
          <LayoutWrapper>
            <HomePage />
          </LayoutWrapper>
        }
      />
      <Route
        path="/dashboard"
        element={
          <LayoutWrapper>
            <HomePage />
          </LayoutWrapper>
        }
      />
      <Route
        path="/lessons"
        element={
          <LayoutWrapper>
            <Lessons />
          </LayoutWrapper>
        }
      />
      <Route
        path="/words"
        element={
          <LayoutWrapper>
            <Words />
          </LayoutWrapper>
        }
      />
      <Route
        path="/books"
        element={
          <LayoutWrapper>
            <Books />
          </LayoutWrapper>
        }
      />
      <Route
        path="/account"
        element={
          <LayoutWrapper>
            <Account />
          </LayoutWrapper>
        }
      />
      <Route
        path="/login"
        element={
          <LoginForm onLogin={handleLogin} onRegister={handleRegister} />
        }
      />
    </Routes>
  );
};
