import { urlFor } from "@/sanity/sanity-utils";
import { Card, CardContent, CardFooter } from "../../../../components/ui/card";
import Image from "next/image";
import Link from "next/link";

export type ProductCardData = {
  name: string;
  category: string;
  price: number;
  images: any;
  _id: string;
  totalReviewCount: number;
  average?: number | string | null;
};

export const ProductCardWithRating = (props: { product: ProductCardData }) => {
  const { product } = props;
  const averageRating = Number(product.average) || 0;

  // Generate an array of 5 star types: "full", "half", or "empty"
  const getStarTypes = (rating: number) => {
    const starTypes: ("full" | "half" | "empty")[] = [];
    for (let i = 0; i < 5; i++) {
      if (rating >= i + 1) {
        starTypes.push("full");
      } else if (rating >= i + 0.5) {
        starTypes.push("half");
      } else {
        starTypes.push("empty");
      }
    }
    return starTypes;
  };

  const starTypes = getStarTypes(averageRating);

  // SVG icons
  const FullStar = () => (
    <svg className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
      <path d="M10 15l-5.878 3.09L5.82 12.18.977 7.91l6.342-.92L10 1l2.681 5.99 6.342.92-4.843 4.27 1.698 5.91z" />
    </svg>
  );
  const HalfStar = () => (
    <svg className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
      <defs>
        <linearGradient id="halfGrad">
          <stop offset="50%" stopColor="#facc15" />
          <stop offset="50%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <path
        d="M10 15l-5.878 3.09L5.82 12.18.977 7.91l6.342-.92L10 1l2.681 5.99 6.342.92-4.843 4.27 1.698 5.91z"
        fill="url(#halfGrad)"
        stroke="#facc15"
      />
    </svg>
  );
  const EmptyStar = () => (
    <svg
      className="w-4 h-4 stroke-yellow-400 fill-transparent"
      viewBox="0 0 20 20"
    >
      <path d="M10 15l-5.878 3.09L5.82 12.18.977 7.91l6.342-.92L10 1l2.681 5.99 6.342.92-4.843 4.27 1.698 5.91z" />
    </svg>
  );

  return (
    <Link href={`/details/${product._id}`}>
      <Card className="rounded-none w-fit h-96 border-none group cursor-pointer">
        <CardContent className="h-72 overflow-hidden">
          <Image
            src={urlFor(product.images).url()}
            width={250}
            height={250}
            alt="Product Image"
            className="group-hover:scale-110 transition-all duration-1000"
          />
        </CardContent>

        {/* Rating Section */}
        <div className="bg-yellow-50 px-3 py-1 rounded-md shadow-sm w-fit ml-3 mt-2">
          <div className="flex items-center gap-1">
            {starTypes.map((type, index) =>
              type === "full" ? (
                <FullStar key={index} />
              ) : type === "half" ? (
                <HalfStar key={index} />
              ) : (
                <EmptyStar key={index} />
              )
            )}
            <span className="text-black ml-2 text-sm font-medium">
              {averageRating.toFixed(1)} ({product.totalReviewCount}) Reviews
            </span>
          </div>
        </div>

        <CardFooter className="flex flex-col items-start text-md font-semibold py-0 mt-3 space-y-1">
          <p className="text-[#212121]">{product.name}</p>
          <p className="text-[#888888]">{product.category}</p>
          <p className="text-[#212121] text-[20px]">Rs. {product.price}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};
export const ProductCard = (props: { product: ProductCardData }) => {
  const { product } = props;

  // SVG icons

  return (
    <Link href={`/details/${product._id}`}>
      <Card className="rounded-none w-fit h-96 border-none group cursor-pointer">
        <CardContent className="h-72 overflow-hidden">
          <Image
            src={urlFor(product.images).url()}
            width={250}
            height={250}
            alt="Product Image"
            className="group-hover:scale-110 transition-all duration-1000"
          />
        </CardContent>

        {/* Rating Section */}

        <CardFooter className="flex flex-col items-start text-md font-semibold py-0 mt-3 space-y-1">
          <p className="text-[#212121]">{product.name}</p>
          <p className="text-[#888888]">{product.category}</p>
          <p className="text-[#212121] text-[20px]">Rs. {product.price}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};
