import * as React from "react"

export const playAudio = (url: string | undefined | null) => {
  if (!url) return;
  const audio = new Audio(url);
  audio.play();
};