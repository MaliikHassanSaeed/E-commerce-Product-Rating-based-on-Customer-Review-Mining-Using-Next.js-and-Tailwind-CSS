"use client";
import React, { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/sanity-utils";
const Carousel = ({
  images,
}: {
  images:
    | {
        _type: "image";
        asset: {
          _ref: string;
          _type: "reference";
        };
      }[]
    | undefined;
}) => {
  console.log("🚀 ~ file: Carousel.tsx:16 ~ images:", images);
  const [selectedImage, setSelectedImage] = useState(images![0]);
  return (
    <div className="w-full lg:w-2/3 flex lg:h-[90vh]">
      <div className="flex flex-col w-[15%] mr-12 h-[30vh] lg:h-full overflow-y-auto">
        {images?.map((image, i) => (
          <div
            className="w-full h-16 md:h-28 lg:w-32 lg:h-32 relative mb-3"
            key={i}
          >
            <Image
              src={urlFor(image).url()}
              alt=""
              fill
              className="cursor-pointer"
              onClick={() => {
                setSelectedImage(image);
              }}
            />
          </div>
        ))}
      </div>
      <div className="w-[70%] aspect-[9/12] relative">
        <Image fill src={urlFor(selectedImage).url()} alt="" />{" "}
      </div>
    </div>
  );
};

export default Carousel;
