import React, { useState } from "react";
import { Background } from "../../background/Background.tsx";
import { NavBar } from "../../NavBar/NavBar.tsx";
import { BookProps }  from "../../pages/books/Book.tsx"
import BookShelf from "./BookShelf.tsx";
import BookReader from "./BookReader.tsx";
import "./Books.css";

export const Books: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<BookProps | null>(null);

  const handleBookSelect = (book: BookProps) => {
    setSelectedBook(book);
  };

  const handleBack = () => {
    setSelectedBook(null);
  };

  return (
    <div className="bookPage">
      <Background type="image" />
      <NavBar />
      {selectedBook ? (
        <BookReader book={selectedBook} onBack={handleBack} />
      ) : (
        <BookShelf onBookSelect={handleBookSelect} />
      )}
    </div>
  );
};
