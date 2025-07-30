"use client";
import React from "react";
import Confetti from "react-confetti";

const ConfettiProvider = () => {
  return (
    <>
      <Confetti width={window.innerWidth} height={window.innerHeight} />
    </>
  );
};

export default ConfettiProvider;
