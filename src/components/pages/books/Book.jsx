import React from "react";
import "./Book.css";

const Book = ({ title, author, coverUrl, level, started, onClick, style }) => (
  <div className="book" onClick={onClick} style={style}>
    <img
      src={coverUrl || "/placeholder.svg"}
      alt={`${title} cover`}
      className="book-cover"
    />
    <div className="book-info">
      <h3>{title}</h3>
      <p>{author}</p>
      <p>Level: {level}</p>
      {started && <span className="started-badge">Started</span>}
    </div>
  </div>
);

export default Book;
