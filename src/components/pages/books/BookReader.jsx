import React from "react";
import { useState, useEffect, useRef } from "react";
import "./BookReader.css";
import UserService from "../../../services/userServices";

const BookReader = ({ book }) => {
  const bookId = book.id;
  const pageSize = book.pageSize;
  const title = book.title;
  const [pageContent, setPageContent] = useState("");
  const userId = UserService.getUserId();
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedWord, setSelectedWord] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [dictionary, setDictionary] = useState([]);
  const [translation, setTranslation] = useState("");
  const popupRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPage = async () => {
      setIsLoading(true);
      try {
        const cursor = await getCursor(userId, bookId);
        console.log(cursor);
        const response = await fetch(
          `${process.env.REACT_APP_GATEWAY_URL}/api/v1/books/${bookId}/${cursor}`,
          { method: "GET", headers: { "Content-Type": "application/json" } }
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const bookContent = await response.json();
        if (bookContent) {
          setCurrentPage(bookContent.pageNumber);
          setPageContent(bookContent.content);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching page:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPage();
  }, [bookId, userId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setSelectedWord(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getTranslation = (word) => {
    // TODO
    setTimeout(() => {
      const translations = {
        hello: "hola",
        world: "mundo",
        book: "libro",
        read: "leer",
        page: "página",
        dictionary: "diccionario",
      };

      setTranslation(
        translations[word.toLowerCase()] || "No translation available"
      );
    }, 300);
  };

  const getCursor = async (userId, bookId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_GATEWAY_URL}/api/v1/user-progress/${userId}/book/${bookId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch cursor: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching cursor:", error);
      return 0;
    }
  };

  const handleWordClick = (event) => {
    const word = event.target.textContent.replace(/[.,!?;:'"()]/g, "");
    setSelectedWord(word);
    getTranslation(word);

    // Calculate popup position
    const rect = event.target.getBoundingClientRect();
    setPopupPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
  };

  const addToDictionary = () => {
    if (selectedWord && !dictionary.includes(selectedWord)) {
      setDictionary([...dictionary, selectedWord]);
    }
    setSelectedWord(null);
  };

  const nextPage = () => {
    if (currentPage < pageSize - 1) {
      const fetchNextPage = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(
            `http://localhost:8899/api/v1/books/${bookId}/${userId}/next`,
            { method: "GET", headers: { "Content-Type": "application/json" } }
          );
          if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
          const bookContent = await response.json();
          if (bookContent) {
            setCurrentPage(bookContent.pageNumber);
            setPageContent(bookContent.content);
            setIsLoading(false);
          }
        } catch (error) {
          console.error("Error fetching page:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchNextPage();
      setSelectedWord(null);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setSelectedWord(null);
    }
  };

  const renderPage = (pageContent) => {
    if (!pageContent) return null;
    const words = pageContent.split(/(\s+)/);
    return (
      <div style={{ whiteSpace: "pre-wrap" }}>
        {words.map((word, index) => {
          if (word.trim() === "") {
            return word;
          }
          return (
            <span key={index} className="word" onClick={handleWordClick}>
              {word}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="book-reader">
      <div className="title">
        <h2>{title}</h2>
      </div>
      <div className="book-content">
        <div className="page">
          {!isLoading ? renderPage(pageContent) : "Loading book..."}
        </div>

        {selectedWord && (
          <div
            ref={popupRef}
            className="word-popup"
            style={{ top: popupPosition.top, left: popupPosition.left }}
          >
            <div className="popup-header">
              <h3>{selectedWord}</h3>
              <button
                className="close-btn"
                onClick={() => setSelectedWord(null)}
              >
                ×
              </button>
            </div>
            <div className="popup-content">
              <p className="translation">
                {translation || "Loading translation..."}
              </p>
              <button className="add-btn" onClick={addToDictionary}>
                Add to Dictionary
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="navigation">
        <button
          className="nav-btn"
          onClick={prevPage}
          disabled={currentPage === 0}
        >
          Previous Page
        </button>
        <span className="page-info">
          Page {currentPage} of {pageSize}
        </span>
        <button
          className="nav-btn"
          onClick={nextPage}
          disabled={currentPage === pageSize - 1}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default BookReader;
