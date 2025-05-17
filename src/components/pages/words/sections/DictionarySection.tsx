import React from "react";
import "../WordSelect.css";
import { useState } from "react"
import { Word } from "../Word.tsx"
import UserService from "../../../../services/userServices.tsx";
import HTTPService from "../../../../services/httpService.tsx";
import PlayArrow from '@mui/icons-material/PlayArrow';
import { playAudio } from "../../../ui/Audio.tsx";

export const DictionarySection: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [wordResult, setWordResult] = useState<Word | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const userId = UserService.getUserId();
    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!searchTerm.trim()) return
    
        setIsLoading(true)
        setError("")
    
        try {
          const response = await HTTPService.getAxiosClient().get(`http://localhost:8899/api/v1/words/${encodeURIComponent(searchTerm)}/user/${userId}`,
          {
            method: HTTPService.HttpMethods.GET,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
    
          if (!response.status) {
            throw new Error("Word not found")
          }    

          setWordResult(response.data)
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
          const response = await fetch(`http://localhost:8899/api/v1/words/${wordResult.id}/user/${userId}`, {
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
        <>
          <h2>Dizionario</h2>
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cerca la parola..."
              className="search-input"
            />
            <button type="submit" className="search-button">
              Cerca
            </button>
          </form>
          {isLoading && <div className="loading">Loading...</div>}
          {error && <div className="error">{error}</div>}

          {wordResult && (
            <div className="word-result">
              <h3>{wordResult.content}
                 {typeof wordResult.pronunciation === 'string' && wordResult.pronunciation && (
                    <button
                    onClick={() => playAudio(wordResult.pronunciation)}
                    className="audio-button"
                    title="Play pronunciation"
                    >
                    <PlayArrow />
                  </button>
                  )}</h3> 
              <div className="word-details">
                <div className="detail-section">
                  <p>
                    <strong>Definition:</strong> {wordResult.alteration}
                  </p>
                  <p>
                    <strong>Traduzione:</strong>
                  </p>
                    {wordResult.translations.map((t, index) => (
                        <p>{t.priority}. {t.text}</p>
                    ))}
                  
                  <p>
                    <strong>Utilizzo:</strong>
                  </p>
                    {wordResult.usages &&( wordResult.usages.map((usage, index) => (
                      <p>
                        {usage.text}
                        {usage.pronunciation && (
                          <button
                          onClick={() => playAudio(usage.pronunciation)}
                          className="audio-button"
                          title="Play pronunciation"
                        >
                          <PlayArrow />
                        </button>     
                        )}
                      </p>
                    )))}
                </div>
                <div className="interactive-section">
                {wordResult.imgUrl && (
                  <div className="image-section">
                    <img src={wordResult.imgUrl} alt={`Example for ${wordResult.content}`} className="word-image" />
                  </div>
                )}
                <div className="progress-section">
                  <h4>Progress</h4>
                  <div className="progress-container">
                    <div className="progress-bar" style={{ width: `${wordResult.progress}%` }}></div>
                  </div>
                  <span className="progress-text">{wordResult.progress}%</span>
                </div>
                <button onClick={toggleStudyStatus} className="toggle-study-button">
                  {wordResult.started ? "Remove from Study List" : "Add to Study List"}
                </button>
              </div>
              </div>
            </div>
          )}
        </>
    )
}
   