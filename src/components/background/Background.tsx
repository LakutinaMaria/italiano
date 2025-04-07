import React from "react";
import "./Background.css";

interface BackgroundProps {
  type: "video" | "image"; 
}

export const Background: React.FC<BackgroundProps> = ({ type }) => {
  return (
    <>
      {type === "video" && (
        <div className="video-background">
          <video autoPlay loop muted playsInline>
            <source
              src={`${process.env.PUBLIC_URL}/roud.mp4`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      {type !== "video" && <div className="img-background"></div>}
    </>
  );
};
