import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  return (
    <header className="header">
      <Link to="/dashboard" className="logo">
        STRADA PER ROMA
      </Link>
      <nav className="navBar">
        <Link to="/dashboard">HOME</Link>
        <Link to="/lessons">LESSONS</Link>
        <Link to="/words">PAROLE</Link>
        <Link to="/books">LIBRI</Link>
        <Link to="/account">ACCOUNT</Link>
      </nav>
    </header>
  );
};
