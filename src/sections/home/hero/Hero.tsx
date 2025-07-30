"use client";
import React, { useRef } from "react";
import { Phone, ShoppingCart } from "lucide-react";
import bazaar from "@/assets/bazaar.png";
import bustle from "@/assets/bustle.png";
import instyle from "@/assets/instyle.png";
import versace from "@/assets/versace.png";
import heroImage from "@/assets/hero.png";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
const Hero = () => {
  const container = useRef(null);
  const animateOnView = useInView(container, { amount: 0.5 });
  const animateOnViewP = useInView(container, { amount: 0.6 });
  const animateOnViewButton = useInView(container, { amount: 0.65 });
  const variantsOfH2 = {
    initial: {
      opacity: 0,
      x: "-100%",
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        type: "spring",
      },
    },
  };
  const variantsOfImage = {
    initial: {
      opacity: 0,
      x: "100%",
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        type: "spring",
      },
    },
  };
  const variantsOfP = {
    initial: {
      opacity: 0,
      x: "-100%",
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        type: "spring",
      },
    },
  };
  const variantsOfButton = {
    initial: {
      opacity: 0,
      x: "-100%",
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        type: "spring",
      },
    },
  };

  return (
    <div
      ref={container}
      className={
        "xl:h-[calc(100vh-6rem)] lg:grid grid-cols-2 w-full overflow-hidden"
      }
    >
      <div className="flex flex-col col-span-1 px-8 py-8 xl:px-24 xl:py-20">
        <motion.h2
          variants={variantsOfH2}
          initial="initial"
          animate={animateOnView ? "animate" : "initial"}
          className="font-bold text-5xl lg:text-6xl my-10 md:block hidden"
        >
          Elegance in Every Soft Swipe 
        </motion.h2>
        <motion.p
          variants={variantsOfP}
          initial="initial"
          animate={animateOnViewP ? "animate" : "initial"}
          className="text-[#666666] md:block hidden"
        >
          Anyone can beat you, but no one can beat your style as long as you are powered by the right device.
        </motion.p>
        <h2
          className="font-bold text-5xl lg:text-6xl my-10 md:hidden block"
        >
          Elegance in Every Soft Swipe 
        </h2>
        <p
          className="text-[#666666] md:hidden block"
        >
          Anyone can beat you, but no one can beat your style as long as you are powered by the right device.
        </p>

        <motion.div
          variants={variantsOfButton}
          initial="initial"
          animate={animateOnViewButton ? "animate" : "initial"}
        >
          <Link
            href={"/allProducts"}
            className="bg-black text-white text-md font-semibold rounded-none py-5 w-fit px-8 mt-10 flex"
          >
            <ShoppingCart className="mr-2" />
            Start Shopping
          </Link>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 mt-16 xl:gap-y-0 gap-y-4">
          <Image src={bazaar} alt="clients" />
          <Image src={bustle} alt="clients" />
          <Image src={versace} alt="clients" />
          <Image src={instyle} alt="clients" />
        </div>
      </div>
      <div className="col-span-1 flex justify-center items-center">
        <motion.div
          variants={variantsOfImage}
          initial="initial"
          animate={animateOnView ? "animate" : "initial"}
          className="w-2/3 aspect-square bg-[#FFECE3] md:flex hidden items-center justify-center rounded-full overflow-hidden"
        >
          <Image
            src={heroImage}
            alt="Hero image"
            className="scale-90 rounded-full"
          />
        </motion.div>
          <div
          className="w-2/3 aspect-square  bg-[#FFECE3] md:hidden flex items-center justify-center rounded-full overflow-hidden"
        >
          <Image
            src={heroImage}
            alt="Hero image"
            className="scale-90 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
