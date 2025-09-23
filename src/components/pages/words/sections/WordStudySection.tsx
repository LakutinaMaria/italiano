import React from "react";
import { Typography, Button, Box } from "@mui/material";
import { School, TrendingUp, PlayCircle } from "@mui/icons-material";
import {MODE} from "../Words.tsx";


export interface WordStudyProps {
  onModeSelect: (mode: MODE) => void;
}

const WordStudySelect: React.FC<WordStudyProps> = ({ onModeSelect }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Poppins, sans-serif', mb: 3 }}>
            Impara le parole
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
            <Button
                variant="contained"
                size="large"
                onClick={() => onModeSelect(MODE.quickStudy)}
                startIcon={<School />}
                sx={{
                    fontFamily: 'Poppins, sans-serif',
                    py: 2,
                    fontSize: '1.1rem'
                }}
            >
                Impara
            </Button>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                    variant="outlined"
                    onClick={() => onModeSelect(MODE.lastAddedStudy)}
                    startIcon={<PlayCircle />}
                    sx={{
                        fontFamily: 'Poppins, sans-serif',
                        py: 1.5
                    }}
                >
                    Impara ultimo aggiunto
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => onModeSelect(MODE.progress)}
                    startIcon={<TrendingUp />}
                    sx={{
                        fontFamily: 'Poppins, sans-serif',
                        py: 1.5
                    }}
                >
                    Progresso
                </Button>
            </Box>
        </Box>
    </Box>
);

export default WordStudySelect;
