"use client";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="lg:h-16 border-t border-t-black flex items-center justify-evenly md:justify-around flex-col lg:flex-row py-5 lg:py-0">
      <p className="text-[#666666]">Copyright &copy; by M Hassan Saeed.</p>
      <p className="text-[#666666]">
        Design by.{" "}
        <span className="font-bold text-black">Weird Design Studio</span>{" "}
      </p>
      <p className="text-[#666666]">
        Code by.{" "}
        <a
          href={"https://github.com/MaliikHassanSaeed"}
          target="_blank"
          className="font-bold text-black"
        >
          MaliikHassanSaeed
        </a>
      </p>
    </div>
  );
};

export default Footer;
