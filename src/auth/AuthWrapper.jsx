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

export const AuthWrapper = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<HomePage />} />
      <Route path="/lessons" element={<Lessons />} />
      <Route path="/words" element={<Words />} />
      <Route path="/books" element={<Books />} />
      <Route path="/account" element={<Account />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
};
