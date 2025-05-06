"use client"

import type React from "react"
import "./WordSelect.css"
import  WordStudySelect  from "./sections/WordStudySection.tsx"
import { WordStudyProps} from "./sections/WordStudySection.tsx"
import { DictionarySection } from "./sections/DictionarySection.tsx" 

export const WordSelect: React.FC<WordStudyProps> = ({onModeSelect}) => {
  return (
    <div className="wordSelectcontainer">
       <div className="main-content">
        <div className="study-section">
          <WordStudySelect onModeSelect={onModeSelect}/>   
        </div>    
        <div className="dictionary-section">
          <DictionarySection/>
        </div>
      </div>
    </div>
  )
}
