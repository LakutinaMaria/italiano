"use client"

import { useState, useEffect, useRef } from "react";import styles from "./book-reader.module.css";
import { BookProps } from "./Book.tsx";
import { getCursor, wordClick }  from "./book-reader/apiBookReared.tsx";
import UserService from "../../../services/userServices.tsx";
import { Word } from "../words/Word.tsx";


type BookReaderProps = {
  book: BookProps;
  onBack: () => void;
};

const BookReader: React.FC<BookReaderProps> = ({ book, onBack }) => {
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [hoveredWord, setHoveredWord] = useState<string | null>(null)
  const [selectedWord, setSelectedWord] = useState<Word | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const bookId = book.id;
  const userId = UserService.getUserId();
  const [pageContent, setPageContent] = useState("");
  const hasFetchedInitial = useRef(false);

  const fetchPage = async (page: number) => {
    setIsLoading(true);
    try {
      const cursor = page === 0 ? await getCursor(userId, bookId) : page;
      console.log(cursor);
      const response = await fetch(
        `${process.env.REACT_APP_GATEWAY_URL}/api/v1/books/${bookId}/page/${cursor}/user/${userId}`,
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const bookContent = await response.json();
      if (bookContent) {
        setCurrentPage(bookContent.pageNumber);
        setPageContent(bookContent.content);
        console.log(bookContent.content)
      }
    } catch (error) {
      console.error("Error fetching page:", error);
    } finally {
      setIsLoading(false);
    }
  };

   useEffect(() => {
     if (!hasFetchedInitial.current) {
       hasFetchedInitial.current = true;
       fetchPage(currentPage);
     }
   }, [currentPage]); 

  const handleWordHover = (word: string) => {
    setHoveredWord(word)
  }

  // Function to handle word click
  const handleWordClick = async (word: string) => {  
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const wordData: Word = {
        id: `word-${Date.now()}`,
        text: word,
        translation:
          word === "vulnerable"
            ? "susceptible to physical or emotional attack or harm"
            : word === "advice"
              ? "guidance or recommendations offered with regard to prudent future action"
              : "Translation not available",
        usage: [`The team's defense was vulnerable to fast attacks.`, `She felt vulnerable after sharing her secret.`],
        isStudying: word === "advice",
        progress: word === "advice" ? 65 : 0,
      }

      setSelectedWord(wordData)
    } catch (error) {
      console.error("Error fetching word data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Function to add word to study list
  const handleAddToStudy = () => {
    if (selectedWord) {
      setSelectedWord({
        ...selectedWord,
        isStudying: true,
        progress: 0,
      })
    }
  }

  const handleNextPage = () => {
    if (currentPage < book.pageSize) {
      fetchPage(currentPage + 1);
      setCurrentPage(currentPage + 1);
      setSelectedWord(null);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      fetchPage(currentPage - 1);
      setCurrentPage(currentPage - 1);
      setSelectedWord(null);
    }
  };

  // Function to render the text with interactive words
  const renderInteractiveText = (text: string) => {
    const words = text.split(" ")

    return words.map((word, index) => {
      // Remove punctuation for comparison but keep it for display
      const cleanWord = word.replace(/[.,;!?()'"]/g, "")
      const isHovered = hoveredWord === cleanWord

      return (
        <span
          key={index}
          className={`${styles.word} ${isHovered ? styles.wordHovered : ""}`}
          onMouseEnter={() => handleWordHover(cleanWord)}
          onMouseLeave={() => setHoveredWord(null)}
          onClick={() => handleWordClick(cleanWord)}
        >
          {word}{" "}
        </span>
      )
    })
  }

  return (
    <div className={styles.bookReader}>
      <header className={styles.bookHeader}>
        <h1>{book.title}</h1>
      </header>

      <main className={styles.bookContent}>
        <div className={styles.pageContent}>{renderInteractiveText(pageContent)}</div>

        <div className={styles.translationCard}>
          {isLoading ? (
            <div className={styles.loader}>Loading...</div>
          ) : selectedWord ? (
            <>
              <h2>{selectedWord.text}</h2>
              <p className={styles.translation}>{selectedWord.translation}</p>

              {selectedWord.usage && (
                <div className={styles.usageExamples}>
                  <h3>Usage Examples:</h3>
                  <ul>
                    {selectedWord.usage.map((example, index) => (
                      <li key={index}>{example}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedWord.isStudying ? (
                <div className={styles.progressContainer}>
                  <h3>Study Progress</h3>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: `${selectedWord.progress}%` }}></div>
                  </div>
                  <span>{selectedWord.progress}%</span>
                </div>
              ) : (
                <button className={styles.studyButton} onClick={handleAddToStudy}>
                  Add to Study List
                </button>
              )}
            </>
          ) : (
            <div className={styles.emptyState}>
              <p>Hover over a word and click to see its translation</p>
            </div>
          )}
        </div>
      </main>

      <footer className={styles.pageNavigation}>
        <button className={styles.navButton} onClick={() => handlePrevPage()} disabled={currentPage === 1}>
          Previous Page
        </button>
        <span className={styles.pageNumber}>
          Page {currentPage} of {book.pageSize}
        </span>
        <button
          className={styles.navButton}
          onClick={() => handleNextPage()}
          disabled={currentPage === book.pageSize}
        >
          Next Page
        </button>
      </footer>
    </div>
  )
}

export default BookReader;
