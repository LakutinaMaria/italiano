"use client"

import type React from "react"
import { useState } from "react"
import "./WordSelect.css"
import { Word } from "./Word.tsx"
import {MODE} from "./Words.tsx";
 
interface WordStudyProps {
  onModeSelect: (mode: MODE) => void;
}

export const WordSelect: React.FC<WordStudyProps> = ({onModeSelect}) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [wordResult, setWordResult] = useState<Word | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchTerm.trim()) return

    setIsLoading(true)
    setError("")

    try {
      // Replace with your actual API endpoint
      const response = await fetch(`/api/dictionary?word=${encodeURIComponent(searchTerm)}`)

      if (!response.ok) {
        throw new Error("Word not found")
      }

      const data = await response.json()
      setWordResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch word")
      setWordResult(null)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleStudyStatus = async () => {
    if (!wordResult) return

    try {
      // Replace with your actual API endpoint
      const response = await fetch(`/api/words/${wordResult.id}/toggle-study`, {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Failed to update study status")
      }

      const updatedWord = await response.json()
      setWordResult(updatedWord)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update study status")
    }
  }

  return (
    <div className="wordSelectcontainer">

      <div className="main-content">
        <div className="study-section">
          <h2>Study Words</h2>
          <div className="study-buttons">
            <button className="study-button quick-study">Quick Study</button>
            <div className="secondary-buttons">
              <button className="study-button">Study Last Added</button>
              <button className="study-button">My Progress</button>
            </div>
          </div>
        </div>

        <div className="dictionary-section">
          <h2>Dictionary</h2>
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a word..."
              className="search-input"
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </form>

          {isLoading && <div className="loading">Loading...</div>}
          {error && <div className="error">{error}</div>}

          {wordResult && (
            <div className="word-result">
              <h3>{wordResult.content}</h3>

              <div className="word-details">
                <div className="detail-section">
                  <h4>Definition, Translation & Usage</h4>
                  <p>
                    <strong>Definition:</strong> {wordResult.definition}
                  </p>
                  <p>
                    <strong>Translation:</strong> {wordResult.translation}
                  </p>
                  <p>
                    <strong>Usage:</strong> {wordResult.usage}
                  </p>
                </div>

                <div className="progress-section">
                  <h4>Progress</h4>
                  <div className="progress-container">
                    <div className="progress-bar" style={{ width: `${wordResult.progress}%` }}></div>
                  </div>
                  <span className="progress-text">{wordResult.progress}%</span>
                </div>

                <button onClick={toggleStudyStatus} className="toggle-study-button">
                  {wordResult.isStudying ? "Remove from Study List" : "Add to Study List"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
