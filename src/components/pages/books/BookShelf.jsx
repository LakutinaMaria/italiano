import React from "react";
import Book from "./Book";
import "./BookShelf.css";
import { useState, useEffect } from "react";
import HTTPService from "../../../services/httpService";

const BookShelf = ({ onBookSelect }) => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showStartedOnly, setShowStartedOnly] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [filteredBooks, setFilteredBooks] = useState([]);

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
    const filtered = books.filter((book) => {
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
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <label className="started-only">
            <input
              type="checkbox"
              checked={showStartedOnly}
              onChange={(e) => setShowStartedOnly(e.target.checked)}
            />
            Mostra solo i libri iniziati
          </label>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="level-select"
          >
            <option value="All">Tutti i livelli</option>
            <option value="Beginner">Principiante</option>
            <option value="Intermediate">Intermedio</option>
            <option value="Advanced">Avanzato</option>
          </select>
        </div>
        <div className="books-grid">
          {filteredBooks.map((book) => (
            <Book
              key={book.id}
              style={{ cursor: "pointer" }}
              onClick={() => onBookSelect(book)}
              {...book}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default BookShelf;
