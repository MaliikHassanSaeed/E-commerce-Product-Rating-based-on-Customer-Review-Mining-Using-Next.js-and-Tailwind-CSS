import { Delete, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";

const StructureLoader = () => {
  return (
    <div className="">
      <div className="px-14 lg:px-24 py-16 min-h-screen bg-[#F2F3F7] flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3 flex lg:h-[90vh]">
          <div className="flex flex-col w-[15%] overflow-y-auto mr-12">
            <div className="bg-gray-300 w-full h-0 rounded-xl pb-[100%] animate-pulse" />
          </div>
          <div className="w-[70%] aspect-[9/12] relative">
            <div className="bg-gray-300 w-full h-full rounded-2xl animate-pulse" />
          </div>
        </div>
        <div className="w-full lg:w-1/3 mt-12 lg:mt-0">
          <div className="bg-gray-300 w-2/3 h-6 rounded-full animate-pulse" />
          <div className="bg-gray-300 w-1/2 h-6 rounded-full animate-pulse mt-4" />
          <div className="mt-12">
            <div className="bg-gray-300 w-full h-6 rounded-full animate-pulse mb-4" />
            <div className="bg-gray-300 w-full h-6 rounded-full animate-pulse mb-4" />
            <div className="bg-gray-300 w-3/4 h-6 rounded-full animate-pulse mb-4" />
            <div className="bg-gray-300 w-1/2 h-6 rounded-full animate-pulse mb-4" />
          </div>
          <div className="flex">
            <h4 className="font-bold mr-8">Quantity:</h4>
            <div className="flex h-8 items-center">
              <div className="bg-gray-200 px-3 py-0.5 rounded-full text-3xl font-light animate-pulse">
                -
              </div>
              <span className="mx-5">1</span>
              <div className="bg-gray-200 px-2.5 py-0.5 rounded-full text-3xl font-light animate-pulse">
                {" "}
                +
              </div>
            </div>
          </div>
          <div className="flex items-center mt-10">
            <div className="bg-gray-300 w-1/3 h-10 rounded-md animate-pulse" />
            <span className="font-bold text-lg">$ 000</span>
          </div>
        </div>
      </div>
      <div className="px-16 lg:px-24  relative">
        <h1 className="absolute text-[#F2F3F7] font-bold text-6xl md:text-7xl lg:text-9xl top-0  -z-10 animate-pulse">
          Overview
        </h1>
        <h3 className="font-bold ml-5 py-12">Product Information</h3>
        <hr />
        <div className="grid grid-cols-3 my-8">
          <div className="col-span-1 uppercase text-[#666666] font-bold text-sm">
            Product Detail
          </div>
          <div className="col-span-2">
            <div className="bg-gray-300 w-full h-6 rounded-full animate-pulse mb-4" />
            <div className="bg-gray-300 w-full h-6 rounded-full animate-pulse mb-4" />
            <div className="bg-gray-300 w-3/4 h-6 rounded-full animate-pulse mb-4" />
            <div className="bg-gray-300 w-1/2 h-6 rounded-full animate-pulse mb-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StructureLoader;
