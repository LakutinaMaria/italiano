import React from "react";
import "./NavBar.css";

export const NavBar = () => {
  return (
    <header className="header">
      <a href="/dashboard" className="logo">
        STRADA PER ROMA
      </a>
      <nav className="navBar">
        <a href="/dashboard">HOME</a>
        <a href="/lessons">LESSONS</a>
        <a href="/words">WORDS</a>
        <a href="/books">LIBRI</a>
        <a href="/account">ACCOUNT</a>
      </nav>
    </header>
  );
};
