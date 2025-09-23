import React from "react";
import { Card, CardContent, CardMedia, Typography, Chip, Box } from "@mui/material";

export interface BookProps {
  id: string;
  title: string;
  author: string;
  coverUrl?: string;
  level: string;
  started?: boolean;
  pageSize: 0;
  onClick: () => void;
  style?: React.CSSProperties;
}

const Book: React.FC<BookProps> = ({
  title,
  author,
  coverUrl,
  level,
  started,
  onClick,
  style,
}) => (
  <Card
    onClick={onClick}
    sx={{
      width: 250,
      cursor: 'pointer',
      backgroundColor: 'rgba(255, 255, 255, 0.60)',
      backdropFilter: 'blur(10px)',
      borderRadius: 4,
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 4
      },
      ...style
    }}
  >
    <CardMedia
      component="img"
      sx={{
        height: 300,
        objectFit: 'cover'
      }}
      image={coverUrl || "/placeholder.svg"}
      alt={`${title} cover`}
    />
    <CardContent>
      <Typography
        variant="h6"
        component="h3"
        gutterBottom
        sx={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: '1rem',
          fontWeight: 600,
          lineHeight: 1.3
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          fontFamily: 'Poppins, sans-serif',
          mb: 1
        }}
      >
        {author}
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          variant="body2"
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 500
          }}
        >
          Level: {level}
        </Typography>
        {started && (
          <Chip
            label="Started"
            color="primary"
            size="small"
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '0.75rem'
            }}
          />
        )}
      </Box>
    </CardContent>
  </Card>
);

export default Book;
