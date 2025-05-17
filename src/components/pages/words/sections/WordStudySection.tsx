import React from "react";
import "../WordSelect.css";
import {MODE} from "../Words.tsx";


export interface WordStudyProps {
  onModeSelect: (mode: MODE) => void;
}

const WordStudySelect: React.FC<WordStudyProps> = ({ onModeSelect }) => (
    <>
        <h2>Impara le parole</h2>
        <div className="study-buttons">
        <button className="study-button quick-study" onClick={() => onModeSelect(MODE.quickStudy)}>Impara</button>
        <div className="secondary-buttons">
            <button className="study-button" onClick={() => onModeSelect(MODE.lastAddedStudy)}>Impara ultimo aggiunto</button>
            <button className="study-button" onClick={() => onModeSelect(MODE.progress)}>Progresso</button>
        </div>
        </div>
    </>
);

export default WordStudySelect;
