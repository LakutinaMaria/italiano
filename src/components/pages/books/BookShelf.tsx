import React, { useState, useEffect } from "react";
import Book from "./Book.tsx";
import "./BookShelf.css";
import HTTPService from "../../../services/httpService.tsx";
import {BookProps} from "./Book.tsx";


interface BookShelfProps {
  onBookSelect: (book: BookProps) => void;
}

const BookShelf: React.FC<BookShelfProps> = ({ onBookSelect }) => {
  const [books, setBooks] = useState<BookProps[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showStartedOnly, setShowStartedOnly] = useState<boolean>(false);
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const [filteredBooks, setFilteredBooks] = useState<BookProps[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const query = new URLSearchParams({
          searchTerm,
          showStartedOnly: showStartedOnly.toString(),
          selectedLevel,
        }).toString();

        const response = await HTTPService.getAxiosClient().get(
          `http://localhost:8899/api/v1/books?${query}`,
          {
            method: HTTPService.HttpMethods.GET,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, [searchTerm, showStartedOnly, selectedLevel]);

  useEffect(() => {
    const filtered = books.filter((book: BookProps) => {
      const matchesSearchTerm =
        searchTerm === "" ||
        book.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLevel =
        selectedLevel === "All" || book.level === selectedLevel;
      const matchesStarted = !showStartedOnly || book.started;

      return matchesSearchTerm && matchesLevel && matchesStarted;
    });

    setFilteredBooks(filtered);
  }, [books, searchTerm, showStartedOnly, selectedLevel]);

  return (
    <>
      <div className="book-shelf">
        <div className="filters">
          <input
            type="text"
            placeholder="Cerca libri..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            className="search-input"
          />
          <label className="started-only">
            <input
              type="checkbox"
              checked={showStartedOnly}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setShowStartedOnly(e.target.checked)
              }
            />
            Mostra solo i libri iniziati
          </label>
          <select
            value={selectedLevel}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSelectedLevel(e.target.value)
            }
            className="level-select"
          >
            <option value="All">Tutti i livelli</option>
            <option value="Beginner">Principiante</option>
            <option value="Intermediate">Intermedio</option>
            <option value="Advanced">Avanzato</option>
          </select>
        </div>
        <div className="books-grid">
          {filteredBooks.map((book: BookProps) => (
            <Book
              key={book.id}
              style={{ cursor: "pointer" }}
              {...book}
              onClick={() => onBookSelect(book)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default BookShelf;