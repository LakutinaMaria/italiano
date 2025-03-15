import React, { useState } from "react";
import { Background } from "../../background/Background";
import { NavBar } from "../../NavBar/NavBar";
import BookShelf from "./BookShelf";
import BookReader from "./BookReader";
import "./Books.css";
export const Books = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const handleBookSelect = (book) => {
    setSelectedBook(book);
  };
  const handleBack = () => {
    setSelectedBook(null);
  };
  return (
    <div className="bookPage">
      <Background background={"image"} />
      <NavBar />
      {selectedBook ? (
        <BookReader book={selectedBook} onBack={handleBack} />
      ) : (
        <BookShelf onBookSelect={handleBookSelect} />
      )}
    </div>
  );
};
