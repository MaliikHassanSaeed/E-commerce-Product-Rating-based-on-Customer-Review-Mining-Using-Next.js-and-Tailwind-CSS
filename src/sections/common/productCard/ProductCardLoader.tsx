import { urlFor } from "@/sanity/sanity-utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import Image from "next/image";
export type ProductCardData = {
  name: string;
  category: string;
  price: number;
  images: any;
};

const ProductCardLoader = (props: { product?: ProductCardData }) => {
  return (
    <Card className="rounded-none  h-96 border-none ">
      <CardContent className="h-72 overflow-hidden">
        <div className="w-full h-full bg-gray-200 animate-pulse" />
      </CardContent>
      <CardFooter className="flex flex-col items-start text-md font-semibold py-0 mt-3 w-full">
        <div className="h-3 w-full bg-gray-200 rounded" />
        <div className="h-3 w-full bg-gray-200 rounded my-3" />
        <div className="h-3 w-full bg-gray-200 rounded" />
      </CardFooter>
    </Card>
  );
};

export default ProductCardLoader;
