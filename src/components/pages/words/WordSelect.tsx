"use client"

import type React from "react"
import { Box, Card, CardContent, Typography } from "@mui/material"
import  WordStudySelect  from "./sections/WordStudySection.tsx"
import { WordStudyProps} from "./sections/WordStudySection.tsx"
import { DictionarySection } from "./sections/DictionarySection.tsx"

export const WordSelect: React.FC<WordStudyProps> = ({onModeSelect}) => {
  return (
    <Box sx={{ mt: 10, pt: 4 }}>
      <Box display="flex" gap={3} sx={{ height: '500px' }}>
        {/* Study Section */}
        <Card sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'rgba(255, 255, 255, 0.60)',
          backdropFilter: 'blur(10px)',
          borderRadius: 4
        }}>
          <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <WordStudySelect onModeSelect={onModeSelect}/>
          </CardContent>
        </Card>

        {/* Dictionary Section */}
        <Card sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'rgba(255, 255, 255, 0.60)',
          backdropFilter: 'blur(10px)',
          borderRadius: 4
        }}>
          <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <DictionarySection/>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}
