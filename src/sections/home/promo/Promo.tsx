import Image from "next/image";
import React from "react";
import promo from "@/assets/promo.png";
import Link from "next/link";
const Promo = () => {
  return (
    <div className="lg:min-h-[75vh] bg-[#FBFCFF] max-w-screen flex px-16 lg:px-24 relative -z-10 py-12 flex-col lg:flex-row">
      <div className="relative w-full lg:w-1/2 lg:min-h-[75vh] flex space-x-4 mt-48 md:mt-0">
        <h1 className="absolute top-12 text-[#F2F3F7] font-bold text-6xl md:text-7xl lg:text-9xl -z-[1]">
          Different From Others
        </h1>
        <div className="w-1/2 flex flex-col justify-evenly h-full">
          <div>
            <span className="font-bold">Built with top-grade materials</span>
            <p className="mt-8">
             Engineered with top-grade materials, this mobile phone offers a perfect blend of durability, elegance, and cutting-edge design.
            </p>
          </div>
          <div>
            {" "}
            <span className="font-bold">Professional-grade camera system</span>
            <p className="mt-8">
              Capture every moment in stunning detail with a high-resolution camera system built for clarity and precision.
            </p>
          </div>
        </div>
        <div className="w-1/2 flex flex-col justify-evenly h-full">
          <div>
            <span className="font-bold">Powered by lightning-fast processors</span>
            <p className="mt-8">
              Experience seamless performance with high-speed processors designed to handle multitasking and heavy apps with ease.
            </p>
          </div>
          <div>
            {" "}
            <span className="font-bold">Designed to feel just right</span>
            <p className="mt-8">
              From its slim profile to the smooth contours, this phone is crafted with an eye for detail and high-quality materials.
            </p>
          </div>
        </div>
      </div>
      <div className="flex mr-8 w-full mt-12 lg:mt-0 lg:w-1/2 items-center flex-col md:flex-row">
        <h2 className="absolute text-4xl md:text-6xl top-0 mx-16 font-bold md:-top-40 lg:-top-10">
          Discover cutting-edge smartphones with sleek design.
        </h2>
        <Image src={promo} alt={""} className="h-fit w-fit mr-8" width={100} />
        <div className="mt-8 md:mt-0">
          <p className="font-light mb-8">
           This piece is thoughtfully designed with precision engineering and care, reflecting Tecno’s commitment to innovation and quality. Every device is assembled with meticulous attention to detail, ensuring lasting performance. 
          </p>
          <Link
            href={"/"}
            className="bg-black text-white text-md font-semibold rounded-none py-5  w-fit px-8 mt-10"
          >
            See All Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Promo;
