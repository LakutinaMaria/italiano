import type React from "react"
import {MODE} from "../words/Words.tsx"
import { QuickStudy } from "./sections/QuickStudy.tsx";
import { LastAddedStudy } from "./sections/LastAddedStudy.tsx";
import { StudyPogress } from "./sections/StudyPogress.tsx";
import "../words/WordSelect.css";

type WordStudyProps = {
    mode: MODE | null
    onBack: () => void;
  }

  export const enum STAGE {
    first,
    second,
    third,
    fourth
  } 

  export const WordStudy: React.FC<WordStudyProps> = ({ mode, onBack }) => {
    const renderContent = () => {
      switch (mode) {
        case MODE.quickStudy:
          return <QuickStudy />;
        case MODE.lastAddedStudy:
          return <LastAddedStudy />;
        case MODE.progress:
          return <StudyPogress />;
        case null:
        default:
          return <div>Please select a mode.</div>;
      }
    };
  
    return (
      <div className="word-study-container">
        <button onClick={onBack}>Back</button>
        {renderContent()}
      </div>
    );
  };