import React from "react";
import "./Book.css";

export interface BookProps {
  id: string;
  title: string;
  author: string;
  coverUrl?: string;
  level: string;
  started?: boolean;
  onClick: () => void;
  style?: React.CSSProperties;
}

const Book: React.FC<BookProps> = ({
  title,
  author,
  coverUrl,
  level,
  started,
  onClick,
  style,
}) => (
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
