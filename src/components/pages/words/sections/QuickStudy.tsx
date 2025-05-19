import React from "react";
import { useState, useEffect } from "react";
import {
  getQuickStudyList,
  updateProgress,
  getStudyCardDto,
} from "../api/apiWords.tsx";
import UserService from "../../../../services/userServices.tsx";
import NewWordComponent from "../components/NewWordComponent.tsx";
import StudyWordComponent from "../components/StudyWordComponent.tsx";
import ReviewWordComponent from "../components/ReviewWordComponent.tsx";
import MasteredWrodComponent from "../components/MasteredWrodComponent.tsx";

export type WordComponentProps = {
  word: any;
  onNext: () => void;
};
export const QuickStudy: React.FC = () => {
  const userId = UserService.getUserId();
  const [wordData, setWordData] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchQuickStudy = async () => {
      const wordIDs = await getQuickStudyList(userId);
      if (!Array.isArray(wordIDs)) return;
      const dtoPromises = wordIDs.map((id) => getStudyCardDto(userId, id));
      const dtoResults = await Promise.all(dtoPromises);
      const validDTOs = dtoResults.filter((dto) => dto && dto.stage);
      setWordData(validDTOs);
    };

    fetchQuickStudy();
  }, [userId]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };
  if (wordData.length === 0) return <p>Loading...</p>;
  if (currentIndex >= wordData.length) return <p>Done for now! 🎉</p>;

  const currentWord = wordData[currentIndex];

  switch (currentWord.stage) {
    case "NEW":
      return <NewWordComponent word={currentWord} onNext={handleNext} />;
    case "STUDY":
      return <StudyWordComponent word={currentWord} onNext={handleNext} />;
    case "REVIEW":
      return <ReviewWordComponent word={currentWord} onNext={handleNext} />;
    case "MASTERED":
      return <MasteredWrodComponent word={currentWord} onNext={handleNext} />;
    default:
      return <p>Unknown stage: {currentWord.stage}</p>;
  }
};
