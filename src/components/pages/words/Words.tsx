"use client";

import type React from "react";
import { useState } from "react";
import "./Words.css";
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
    <div className="word-study-container">
      {/* Background and NavBar are now handled by LayoutWrapper */}
      {studyMode !== null ? (
        <WordStudy mode={studyMode} onBack={handleBack} />
      ) : (
        <WordSelect onModeSelect={handleStartStudy} />
      )}
    </div>
  );
};
