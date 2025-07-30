import Image from "next/image";
import { Button } from "../../../../components/ui/button";
import { ShoppingCart } from "lucide-react";
import CartArea from "@/sections/details/cartArea/CartArea";
import Carousel from "@/sections/details/carousel/Carousel";
import ReduxProvider from "@/components/reduxProvider/ReduxProvider";
import ProductReviewForm from "@/sections/details/review/Review";
import ProductReviewsDisplay from "@/sections/details/review/ReviewShow";

const page = async ({ params }: { params: { id: string } }) => {
  const fetchData = async () => {
    try {
      const resp = await fetch(`http://localhost:3000/api/product/${params.id}`, {
        method: "GET",
        cache: "no-store",
      });
      const respJson = await resp.json();
      const data = respJson.data;
      console.log("Fetched Product Data:", data); // ✅ Debugging line
      return data;
    } catch (e: any) {
      console.error("Error fetching product data:", e.message);
      return null;
    }
  };

  const data = await fetchData();

  if (!data || !data.product) {
    return (
      <div className="px-10 py-20 text-center text-xl text-red-500">
        Failed to load product data.
      </div>
    );
  }

  return (
    <div>
      <div className="px-14 lg:px-24 py-16 min-h-screen bg-[#F2F3F7] flex flex-col lg:flex-row">
        <Carousel images={data.product.images} />
        <div className="w-full lg:w-1/3 mt-12 lg:mt-0">
          <h3 className="text-2xl font-semibold">{data.product.name}</h3>
          <span className="text-lg font-semibold text-[#888888]">
            {data.product.category}
          </span>
          <ReduxProvider>
            <CartArea
              colors={data.product.colors}
              price={data.product.price}
              quantity={data.product.currentStock}
              availability={data.product.availability}
              otherData={{
                name: data.product.name,
                _id: data.product._id,
                image: data.product.images[0],
              }}
            />
          </ReduxProvider>
        </div>
      </div>

      <div className="px-16 lg:px-24 relative">
        <h1 className="absolute text-[#F2F3F7] font-bold text-6xl md:text-7xl lg:text-9xl top-0 -z-10">
          Overview
        </h1>
        <h3 className="font-bold ml-5 py-12">Product Information</h3>
        <p className="text-justify font-light"> {data.product.description} </p>
        <hr />
        <div className="grid grid-cols-3 my-8">
          <div className="col-span-1 uppercase text-[#666666] font-bold text-sm">
            Product Detail
          </div>
        </div>
      </div>

      <div>
        <ProductReviewForm productId={data.product._id} />
        <ProductReviewsDisplay
          productId={data.product._id}
          reviews={data.reviews}
        />
      </div>
    </div>
  );
};

export default page;
