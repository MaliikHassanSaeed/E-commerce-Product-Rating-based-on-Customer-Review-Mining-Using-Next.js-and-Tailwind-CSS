import React from "react";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";

const Newsletter = () => {
  return (
    <div className="h-[50vh] max-w-screen flex justify-center items-center flex-col relative">
      <h1 className="absolute text-[#F2F3F7] font-bold text-6xl md:text-7xl lg:text-9xl  -z-10">
        Newsletter
      </h1>
      <h2 className="font-bold text-3xl text-center">
        Subscribe Our Newsletter
      </h2>
      <p className="text-center text-[#666666] my-6">
        Get the latest information and promo offers directly
      </p>
      <div className="flex w-full sm:max-w-sm items-center space-x-2">
        <Input
          type="email"
          className="pl-5 rounded-none w-[1000px]"
          placeholder="Email"
        />
        <Button
          type="submit"
          className="bg-black rounded-none text-white font-bold w-40 line-clamp-1 flex-shrink-0"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Newsletter;
