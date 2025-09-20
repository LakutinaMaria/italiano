import React from "react";
import { Background } from "../background/Background";
import { NavBar } from "../NavBar/NavBar";

interface LayoutWrapperProps {
  children: React.ReactNode;
  backgroundType?: "video" | "image";
  className?: string;
}

export const LayoutWrapper: React.FC<LayoutWrapperProps> = ({
  children,
  backgroundType = "image",
  className = "",
}) => {
  return (
    <div className={`layout-wrapper ${className}`}>
      <Background type={backgroundType} />
      <NavBar />
      {children}
    </div>
  );
};
