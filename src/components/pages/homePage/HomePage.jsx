import React from "react";
import { Background } from "../../background/Background";
import { NavBar } from "../../NavBar/NavBar";

export const HomePage = () => {
  return (
    <div className="main">
      <Background background={"image"} />
      <NavBar />
    </div>
  );
};
