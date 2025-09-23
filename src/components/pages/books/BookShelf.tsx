import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Grid
} from "@mui/material";
import { Search } from "@mui/icons-material";
import Book from "./Book.tsx";
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
    <Box sx={{ mt: 10, pt: 4 }}>
      {/* Filters Section */}
      <Card sx={{
        mb: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.60)',
        backdropFilter: 'blur(10px)',
        borderRadius: 4
      }}>
        <CardContent>
          <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">
            <TextField
              variant="outlined"
              placeholder="Cerca libri..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              sx={{
                minWidth: 250,
                '& .MuiInputBase-input': {
                  fontFamily: 'Poppins, sans-serif'
                }
              }}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'action.active' }} />
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={showStartedOnly}
                  onChange={(e) => setShowStartedOnly(e.target.checked)}
                />
              }
              label={
                <Typography sx={{ fontFamily: 'Poppins, sans-serif' }}>
                  Mostra solo i libri iniziati
                </Typography>
              }
            />

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel sx={{ fontFamily: 'Poppins, sans-serif' }}>Livello</InputLabel>
              <Select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                label="Livello"
                sx={{
                  fontFamily: 'Poppins, sans-serif'
                }}
              >
                <MenuItem value="All" sx={{ fontFamily: 'Poppins, sans-serif' }}>Tutti i livelli</MenuItem>
                <MenuItem value="Beginner" sx={{ fontFamily: 'Poppins, sans-serif' }}>Principiante</MenuItem>
                <MenuItem value="Intermediate" sx={{ fontFamily: 'Poppins, sans-serif' }}>Intermedio</MenuItem>
                <MenuItem value="Advanced" sx={{ fontFamily: 'Poppins, sans-serif' }}>Avanzato</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </CardContent>
      </Card>

      {/* Books Grid */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'flex-start' }}>
        {filteredBooks.map((book: BookProps) => (
          <Book
            key={book.id}
            {...book}
            onClick={() => onBookSelect(book)}
          />
        ))}
      </Box>

      {filteredBooks.length === 0 && (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary" sx={{ fontFamily: 'Poppins, sans-serif' }}>
            No books found matching your criteria
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default BookShelf;