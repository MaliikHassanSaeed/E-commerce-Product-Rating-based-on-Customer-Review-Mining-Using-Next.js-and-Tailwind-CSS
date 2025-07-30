"use client";
import React from "react";
import { motion } from "framer-motion";

const TopText = () => {
  const animationVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  };
  return (
    <div className="text-center py-24 text-[48px] sm:text-[56px] md:text-[64px] font-bold px-4 md:px-12 lg:px-20 bg-gray-100">
      <motion.span
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.1 }}
        className=" text-center  text-[48px] sm:text-[56px] md:text-[64px] font-bold"
        aria-hidden
      >
        {" Power Your Lifestyle with MMZ's Sleek and Smart Mobile Picks."
          .split(" ")
          .map((word: string, i: number) => (
            <motion.span key={i} className="inline-block">
              {word.split("").map((character: string, i: number) => (
                <motion.span
                  variants={animationVariants}
                  className="inline-block"
                  key={i}
                >
                  {character}
                </motion.span>
              ))}
              <span>&nbsp;</span>
            </motion.span>
          ))}
      </motion.span>
    </div>
  );
};

export default TopText;
