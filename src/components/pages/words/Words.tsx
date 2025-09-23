"use client";

import type React from "react";
import { useState } from "react";
import { Box } from "@mui/material";
import { WordSelect } from "./WordSelect.tsx";
import { WordStudy } from "./WordStudy.tsx";

export const enum MODE {
  quickStudy,
  lastAddedStudy,
  progress,
}

export const Words: React.FC = () => {
  const [studyMode, setStudyMode] = useState<MODE | null>(null);

  const handleStartStudy = (mode: MODE) => {
    setStudyMode(mode);
  };

  const handleBack = () => {
    setStudyMode(null);
  };

  return (
    <Box
      sx={{
        width: '100vw',
        maxWidth: 'none',
        py: 4,
        px: 4,
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)'
      }}
    >
      {studyMode !== null ? (
        <WordStudy mode={studyMode} onBack={handleBack} />
      ) : (
        <WordSelect onModeSelect={handleStartStudy} />
      )}
    </Box>
  );
};
