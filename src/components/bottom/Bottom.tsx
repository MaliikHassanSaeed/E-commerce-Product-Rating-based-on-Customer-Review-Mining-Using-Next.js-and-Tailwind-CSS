import Image from "next/image";
import React from "react";
import logo from "@/assets/logo_image.png";
import {
  Facebook,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from "lucide-react";
import Link from "next/link";

const Bottom = () => {
  return (
   
    <div className="max-w-screen lg:h-80 px-24 py-6 flex flex-col lg:flex-row mb-8 lg:mb-0 bg-gray-100">
      <div className="lg:w-1/3 flex-col lg:flex-row">
        <Image src={logo} alt={"logo"} width={200} />
        <p className="text-[#666666] my-8 ml-2 mr-8">
          Small, artisan label that offers a thoughtfully curated collection of
          high quality everyday essentials made.
        </p>
        <div className="flex space-x-4">
          <a
            href="/"
            className="w-10 h-10 bg-[#F1F1F1] rounded-xl flex items-center justify-center"
          >
            <TwitterIcon />
          </a>
          <a
            href={"/"}
            className="w-10 h-10 bg-[#F1F1F1] rounded-xl flex items-center justify-center"
          >
            <Facebook />
          </a>{" "}
          <a
            href={""}
            className="w-10 h-10 bg-[#F1F1F1] rounded-xl flex items-center justify-center"
          >
            <LinkedinIcon />
          </a>
        </div>
      </div>
      <div className="lg:w-2/3 h-full flex flex-col lg:flex-row">
        <div className="lg:w-1/3 h-72">
          <h4 className="font-bold text-xl text-[#666666] my-5">COMPANY</h4>
          <nav>
            <ul className="flex flex-col space-y-3 text-[#666666]">
              <li>
                <Link className="hover:text-blue-600" href={"/"}>About</Link>
              </li>
              <li>
                <Link className="hover:text-blue-600" href={"/privacy"}>Terms of use</Link>
              </li>
              <li>
                <Link className="hover:text-blue-600" href={"/privacy"}>How it Works</Link>
              </li>
              <li>
                <Link className="hover:text-blue-600" href={"/contact"}>Contact Us</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="lg:w-1/3">
          <h4 className="font-bold text-xl text-[#666666] my-5">SUPPORT</h4>
          <nav>
            <ul className="flex flex-col space-y-3 text-[#666666]">
              <li>
                <Link className="hover:text-blue-600" href={"/"}>Support Career</Link>
              </li>
              <li>
                <Link className="hover:text-blue-600" href={"/"}>24h Service</Link>
              </li>
              <li>
                <Link className="hover:text-blue-600" href={"/contact"}>Quick Chat</Link>
              </li>
             
            </ul>
          </nav>
        </div>
        <div className="lg:w-1/3">
          <h4 className="font-bold text-xl text-[#666666] my-5">COLLECTION</h4>
          <nav>
            <ul className="flex flex-col space-y-3 text-[#666666]">
              <li>
                <Link className="hover:text-blue-600" href={"/"}>Apple</Link>
              </li>
              <li>
                <Link className="hover:text-blue-600" href={"/"}>Samsung</Link>
              </li>
              <li>
                <Link className="hover:text-blue-600" href={"/"}>Oppo</Link>
              </li>
              <li>
                <Link className="hover:text-blue-600" href={"/"}>infinix</Link>
              </li>
              <li>
                <Link className="hover:text-blue-600" href={"/"}>Airpods</Link>
              </li>
              <li>
                <Link className="hover:text-blue-600" href={"/"}>Xiaomi</Link>
              </li>
            </ul>
          </nav>
        </div>
       
        <div className="lg:w-1/3">
          <h4 className="font-bold text-xl text-[#666666] my-5">POLICIES</h4>
          <nav>
            <ul className="flex flex-col space-y-3 text-[#666666]">
              <li>
                <Link className="hover:text-blue-600" href={"/"}>Shipping & Cancellation Policy</Link>
              </li>
              <li>
                <Link className="hover:text-blue-600" href={"/"}>Return Policy</Link>
              </li>
              <li>
                <Link className="hover:text-blue-600" href={"/privacy"}>Privacy Policy</Link>
              </li>
              
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Bottom;
