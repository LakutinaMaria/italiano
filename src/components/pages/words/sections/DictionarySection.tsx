import React from "react";
import { useState } from "react"
import {
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  LinearProgress,
  IconButton,
  Alert,
  CircularProgress
} from "@mui/material";
import { Search, PlayArrow } from '@mui/icons-material';
import { Word } from "../Word.tsx"
import UserService from "../../../../services/userServices.tsx";
import HTTPService from "../../../../services/httpService.tsx";
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
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Poppins, sans-serif', mb: 3 }}>
            Dizionario
          </Typography>

          <Box component="form" onSubmit={handleSearch} sx={{ mb: 2, display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cerca la parola..."
              size="small"
              sx={{
                '& .MuiInputBase-input': {
                  fontFamily: 'Poppins, sans-serif'
                }
              }}
            />
            <Button
              type="submit"
              variant="contained"
              startIcon={<Search />}
              sx={{ fontFamily: 'Poppins, sans-serif', minWidth: 100 }}
            >
              Cerca
            </Button>
          </Box>

          {isLoading && (
            <Box display="flex" justifyContent="center" py={2}>
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2, fontFamily: 'Poppins, sans-serif' }}>
              {error}
            </Alert>
          )}

          {wordResult && (
            <Box sx={{ flex: 1, overflow: 'auto' }}>
              <Card sx={{ mb: 2, backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 3 }}>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                      {wordResult.content}
                    </Typography>
                    {typeof wordResult.pronunciation === 'string' && wordResult.pronunciation && (
                      <IconButton
                        onClick={() => playAudio(wordResult.pronunciation)}
                        size="small"
                        color="primary"
                      >
                        <PlayArrow />
                      </IconButton>
                    )}
                  </Box>

                  <Typography variant="body2" sx={{ fontFamily: 'Poppins, sans-serif', mb: 1 }}>
                    <strong>Definition:</strong> {wordResult.alteration}
                  </Typography>

                  <Typography variant="body2" sx={{ fontFamily: 'Poppins, sans-serif', mb: 1 }}>
                    <strong>Traduzione:</strong>
                  </Typography>
                  {wordResult.translations.map((t, index) => (
                    <Typography key={index} variant="body2" sx={{ fontFamily: 'Poppins, sans-serif', ml: 1 }}>
                      {t.priority}. {t.text}
                    </Typography>
                  ))}

                  <Typography variant="body2" sx={{ fontFamily: 'Poppins, sans-serif', mb: 1, mt: 2 }}>
                    <strong>Utilizzo:</strong>
                  </Typography>
                  {wordResult.usages && wordResult.usages.map((usage, index) => (
                    <Box key={index} display="flex" alignItems="center" gap={1} sx={{ ml: 1 }}>
                      <Typography variant="body2" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                        {usage.text}
                      </Typography>
                      {usage.pronunciation && (
                        <IconButton
                          onClick={() => playAudio(usage.pronunciation)}
                          size="small"
                          color="primary"
                        >
                          <PlayArrow />
                        </IconButton>
                      )}
                    </Box>
                  ))}

                  {wordResult.imgUrl && (
                    <Box sx={{ my: 2, textAlign: 'center' }}>
                      <img
                        src={wordResult.imgUrl}
                        alt={`Example for ${wordResult.content}`}
                        style={{ maxWidth: '100%', height: 'auto', borderRadius: 8 }}
                      />
                    </Box>
                  )}

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" sx={{ fontFamily: 'Poppins, sans-serif', mb: 1 }}>
                      <strong>Progress</strong>
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                      <LinearProgress
                        variant="determinate"
                        value={wordResult.progress}
                        sx={{ flex: 1, height: 8, borderRadius: 4 }}
                      />
                      <Typography variant="body2" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                        {wordResult.progress}%
                      </Typography>
                    </Box>
                  </Box>

                  <Button
                    onClick={toggleStudyStatus}
                    variant={wordResult.started ? "outlined" : "contained"}
                    color={wordResult.started ? "error" : "primary"}
                    sx={{ mt: 2, fontFamily: 'Poppins, sans-serif' }}
                    fullWidth
                  >
                    {wordResult.started ? "Remove from Study List" : "Add to Study List"}
                  </Button>
                </CardContent>
              </Card>
            </Box>
          )}
        </Box>
    )
}
   