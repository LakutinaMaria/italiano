import React, { useState } from "react";
import { Box } from "@mui/material";
import { BookProps } from "../../pages/books/Book.tsx";
import BookShelf from "./BookShelf.tsx";
import BookReader from "./BookReader.tsx";

export const Books: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<BookProps | null>(null);

  const handleBookSelect = (book: BookProps) => {
    setSelectedBook(book);
  };

  const handleBack = () => {
    setSelectedBook(null);
  };

  return (
    <Box
      sx={{
        width: '100vw',
        maxWidth: 'none',
        py: 4,
        px: 4,
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)'
      }}
    >
      {selectedBook ? (
        <BookReader book={selectedBook} onBack={handleBack} />
      ) : (
        <BookShelf onBookSelect={handleBookSelect} />
      )}
    </Box>
  );
};
