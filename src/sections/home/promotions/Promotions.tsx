"use client";
import React, { useRef } from "react";
import card1 from "@/assets/card 1.png";
import Image from "next/image";
import { Button } from "../../../../components/ui/button";
import card2 from "@/assets/card2.png";
import card3 from "@/assets/card3.png";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";

const Promotions = () => {
  const router = useRouter();
  const container = useRef(null);
  const cardL1 = useInView(container, { amount: 0.45 });
  const cardL2 = useInView(container, { amount: 0.55 });
  const cardR1 = useInView(container, { amount: 0.35 });
  const cardR2 = useInView(container, { amount: 0.53 });
  const variantsOfCardL1 = {
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
  const variantsOfCardL2 = {
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
  const variantsOfCardR1 = {
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
  const variantsOfCardR2 = {
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
        delay: 0.56,
      },
    },
  };
  return (
    <div
      ref={container}
      className="overflow-x-hidden w-full min-h-screen flex flex-col justify-center items-center"
    >
      <h4 className="font-semibold capitalize text-[#0000ff] text-xs tracking-wider">
        PROMOTIONS
      </h4>
      <h3 className="lg:text-5xl text-4xl font-bold my-5 text-center">
        Our Promotions Events
      </h3>
      <div className="grid px-4 lg:px-16  w-full lg:grid-cols-4 gap-4">
        <div className="col-span-2 grid grid-cols-2 grid-rows-2 gap-4">
          <motion.div
            variants={variantsOfCardL1}
            initial="initial"
            animate={cardL1 ? "animate" : "initial"}
            className="row-span-1 col-span-2 bg-[#D6D6D8] lg:h-full md:flex hidden flex-col md:flex-row pt-8 lg:pt-0 justify-center items-center mb-4 overflow-hidden group cursor-pointer"
          >
            <div className="lg:w-1/2 h-full flex flex-col justify-center items-center">
              <h3 className="font-bold text-3xl text-center">
                GET READY FOR UPCOMING 60% OFF
              </h3>
              <p className="text-center">On your favourite mobiles!</p>
            </div>

            <Image
              src={card1}
              alt={""}
              className="self-center lg:self-end group-hover:scale-[1.15] duration-500 transition-all"
            />
          </motion.div>
          {/* duplicate */}
           <div
            className="row-span-1 col-span-2 bg-[#D6D6D8] lg:h-full md:hidden flex flex-col md:flex-row pt-8 lg:pt-0 justify-center items-center mb-4 overflow-hidden group cursor-pointer"
          >
            <div className="lg:w-1/2 h-full flex flex-col justify-center items-center">
              <h3 className="font-bold text-3xl text-center ">
                GET READY FOR UPCOMING 60% OFF
              </h3>
              <p className="text-center">On your favourite mobiles!</p>
            </div>

            <Image
              src={card1}
              alt={""}
              className="self-center lg:self-end group-hover:scale-[1.15] duration-500 transition-all"
            />
          </div>
          <motion.div
            variants={variantsOfCardL2}
            initial="initial"
            animate={cardL2 ? "animate" : "initial"}
            className="lg:h-full cursor-pointer overflow-hidden group bg-[#212121] py-12 lg:py-0 col-span-2 row-span-1 md:flex hidden justify-center items-center flex-col"
          >
            <h3 className="font-bold text-3xl text-white my-4">
              So What Are You Waiting For
            </h3>
            <Button
              variant={"secondary"}
              onClick={() => router.push("/allProducts")}
              className="text-white bg-[#474747] tracking-[4px] mb-3 transition-all duration-500 group-hover:scale-125"
            >
              Start Shopping
            </Button>
          </motion.div>
          {/* duplicate */}
           <div
            className="lg:h-full cursor-pointer md:hidden flex overflow-hidden group bg-[#212121] py-12 lg:py-0 col-span-2 row-span-1  justify-center items-center flex-col"
          >
            <h3 className="font-bold text-3xl text-white my-4">
              So What Are You Waiting For
            </h3>
            <Button
              variant={"secondary"}
              onClick={() => router.push("/allProducts")}
              className="text-white bg-[#474747] tracking-[4px] mb-3 transition-all duration-500 group-hover:scale-125"
            >
              Start Shopping
            </Button>
          </div>
        </div>
        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            variants={variantsOfCardR1}
            initial="initial"
            animate={cardR1 ? "animate" : "initial"}
            className="bg-[#EFE1C7] col-span-1 md:flex hidden flex-col justify-between group overflow-hidden cursor-pointer"
          >
            <div className="px-4 pt-5">
              <p>Iphone 16 Pro Max</p>
              <p className="font-semibold">
                <span className="line-through font-light">$1,379.00</span>&nbsp;
                $1,199.00
              </p>
            </div>
            <Image
              src={card2}
              alt={""}
              className="self-center transition-all duration-500 group-hover:scale-[1.15]"
            />
          </motion.div>
          {/* duplicate */}
          <div
            className="bg-[#EFE1C7] col-span-1 md:hidden flex flex-col justify-between group overflow-hidden cursor-pointer"
          >
            <div className="px-4 pt-5">
              <p>Iphone 16 Pro Max</p>
              <p className="font-semibold">
                <span className="line-through font-light">$1,379.00</span>&nbsp;
                $1,199.00
              </p>
            </div>
            <Image
              src={card2}
              alt={""}
              className="self-center transition-all duration-500 group-hover:scale-[1.15]"
            />
          </div>
          <motion.div
            variants={variantsOfCardR2}
            initial="initial"
            animate={cardR2 ? "animate" : "initial"}
            className="group col-span-1 bg-[#D7D7D9] md:flex hidden flex-col justify-between overflow-hidden cursor-pointer"
          >
            <div className="px-4 pt-8">
              <p>Airpods (3rd generation)</p>
              <p className="font-semibold">
                <span className="line-through font-light">$162.00</span>&nbsp;
                $134.99
              </p>
            </div>
            <Image
              src={card3}
              alt={""}
              className="self-center group-hover:scale-[1.15] transition-all duration-500"
            />
          </motion.div>
          {/* duplicate */}
          <div
            className="group col-span-1 bg-[#D7D7D9] md:hidden flex flex-col justify-between overflow-hidden cursor-pointer"
          >
            <div className="px-4 pt-8">
              <p>Airpods (3rd generation)</p>
              <p className="font-semibold">
                <span className="line-through font-light">$162.00</span>&nbsp;
                $134.99
              </p>
            </div>
            <Image
              src={card3}
              alt={""}
              className="self-center group-hover:scale-[1.15] transition-all duration-500"
            />
          </div>
          {" "}
        </div>
      </div>
    </div>
  );
};

export default Promotions;
