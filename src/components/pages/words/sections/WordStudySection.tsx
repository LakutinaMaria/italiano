import React from "react";
import "../WordSelect.css";
import {MODE} from "../Words.tsx";


export interface WordStudyProps {
  onModeSelect: (mode: MODE) => void;
}

const WordStudySelect: React.FC<WordStudyProps> = ({
    onModeSelect
}) => (
    <>
        <h2>Impara le parole</h2>
        <div className="study-buttons">
        <button className="study-button quick-study">Impara</button>
        <div className="secondary-buttons">
            <button className="study-button">Impara ultimo aggiunto</button>
            <button className="study-button">Progresso</button>
        </div>
        </div>
    </>
);

export default WordStudySelect;
