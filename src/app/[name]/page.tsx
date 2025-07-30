"use client";
import {
  ProductCard,
  // ProductCardData,
  ProductCardWithRating,
} from "@/sections/common/productCard/ProductCard";
import dynamic from "next/dynamic";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Dynamic imports for Swiper to avoid ESM/CommonJS conflicts
const Swiper = dynamic(() => import("swiper/react").then((mod) => ({ default: mod.Swiper })), { ssr: false });
const SwiperSlide = dynamic(() => import("swiper/react").then((mod) => ({ default: mod.SwiperSlide })), { ssr: false });

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

const Filter = dynamic(() => import("../filter/page" as any), { ssr: false });

export interface ProductCardData {
  _id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  images: string;
  average: number;
  totalReviewCount: number;
  positiveSentimentCount: number;
  negativeSentimentCount: number;
}

const Page = ({
  searchParams,
}: {
  searchParams: { category?: string; brand?: string; filter?: string };
}) => {
  const router = useRouter();
  const searchParamsHook = useSearchParams();
  const [products, setProducts] = useState<ProductCardData[]>([]);

  // Build API URL with current search parameters
  const category = searchParams.category || "";
  const brand = searchParams.brand || "";
  const filter = searchParams.filter || "";
  const apiUrl = `/api/get-products?category=${encodeURIComponent(
    category
  )}&brand=${encodeURIComponent(brand)}&filter=${encodeURIComponent(filter)}`;

  // Fetch products when search parameters change
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${`http://localhost:3000`}${apiUrl}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const resp = await res.json();
        console.log(resp);
        setProducts(resp.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [apiUrl]);

  // Handle filter button click
  const handleFilterClick = (filterValue: string) => {
    const newSearchParams = new URLSearchParams(searchParamsHook.toString());
    if (filterValue) {
      newSearchParams.set("filter", filterValue);
    } else {
      newSearchParams.delete("filter");
    }
    router.push(`/products?${newSearchParams.toString()}`);
  };

  return (
    <div className="mx-12 lg:mx-24 my-8 space-y-10">
      {/* 📢 Campaign Slider */}
      <Swiper
        loop={true}
        className="rounded-xl overflow-hidden shadow-lg h-72"
      >
        {/* Slide 1: Campaign Banner */}
        <SwiperSlide>
          <div className="bg-gradient-to-r from-pink-500 to-yellow-400 text-white p-6 text-center h-full flex flex-col justify-center items-center">
            <h2 className="text-4xl font-semibold mb-2">
              Grab upto 50% off on
              <br /> Selected Products
            </h2>
            <button className="rounded-3xl bg-white text-black w-max py-3 px-5 text-sm mt-4">
              Buy Now
            </button>
          </div>
        </SwiperSlide>

        {/* Slide 2: Image */}
        <SwiperSlide>
          <img
            src="/c3.webp"
            alt="Campaign Image 2"
            className="w-full h-full object-contain"
          />
        </SwiperSlide>
      </Swiper>

      {/* 🧰 Filter Buttons */}
      <div className="flex justify-center space-x-4">
        {["Excellent", "Very Good", "Good", "Below Average", ""].map(
          (filterValue) => (
            <button
              key={filterValue}
              onClick={() => handleFilterClick(filterValue)}
              className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                filter === filterValue
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-blue-100"
              }`}
            >
              {filterValue===""?"All":filterValue}
            </button>
          )
        )}
      </div>

      {/* 🛒 Products Grid */}
      <div className="grid grid-cols-[repeat(1,1fr)] md:grid-cols-[repeat(2,1fr)] lg:grid-cols-[repeat(3,1fr)] xl:grid-cols-[repeat(4,1fr)] gap-8 lg:gap-14 xl:gap-20 justify-center items-center">
        {products?.map((product: ProductCardData, i: number) => (
          <ProductCardWithRating key={i} product={product} />
        ))}
      </div>
      <div className="h-[75px]"></div>
    </div>
  );
};

export default Page;

// Revalidate strategy
export const revalidate = "force-dynamic";