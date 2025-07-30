"use client";
import { addToCart } from "@/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { errToast } from "@/utils/toasts";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../../../../components/ui/button";

const CartArea = ({
  price,
  quantity,
  colors,
  otherData,
  availability,
}: {
  price: number | undefined;
  quantity: number | undefined;
  colors: { colorName: string; hexCode: string }[] | undefined;
  availability: boolean | undefined;
  otherData: {
    _id: string | undefined;
    name: string | undefined;
    image:
      | {
          _type: "image";
          asset: {
            _ref: string;
            _type: "reference";
          };
        }
      | undefined;
  };
}) => {
  const [buynow, setbuynow] = useState(false);
  const loading = useAppSelector((state) => state.cart.pending);
  const [quantityToBuy, setQuantityToBuy] = useState(1);
  const [sizeToBuy, setSizeToBuy] = useState<string | undefined>(undefined);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const addToCartHandler = () => {
    if (!availability) {
      errToast("Oops! The product isn't available.");
      return;
    }
    if (sizeToBuy && quantityToBuy > 0) {
      dispatch(
        addToCart({
          _id: otherData._id!,
          quantity: quantityToBuy,
          size: sizeToBuy,
          router,
        })
      );
      if (buynow) {
        router.push("/checkout");
        setbuynow(false);
      }
      return;
    }
    if (!sizeToBuy) {
      errToast("Please! Select a color to buy.");
      return;
    }
  };

  return (
    <>
      <div className="">
        <h4 className="uppercase font-extrabold mt-12 tracking-wider text-sm">
          Select Color
        </h4>
        <div className="flex flex-wrap gap-4 mt-4">
          {colors?.map((color, i) => (
            <div key={i} className="flex flex-col items-center">
              <button
                className={
                  sizeToBuy === color.colorName
                    ? "border-2 border-black w-12 h-12 rounded-full"
                    : "w-12 h-12 rounded-full border"
                }
                onClick={() => setSizeToBuy(color.colorName)}
                style={{ backgroundColor: color.hexCode }}
              ></button>
              <span className="text-xs mt-1">{color.colorName}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex mt-6 items-center">
        <h4 className="font-bold mr-8">Quantity :</h4>
        <div className="flex h-8 items-center">
          <button
            className={
              quantityToBuy !== 1
                ? "bg-gray-300 px-3 py-0.5 rounded-full text-3xl font-light"
                : "bg-gray-200 px-3 py-0.5 rounded-full text-3xl font-light text-gray-500"
            }
            disabled={quantityToBuy === 1}
            onClick={() => {
              setQuantityToBuy(quantityToBuy - 1);
            }}
          >
            -
          </button>
          <span className="mx-5 w-12 text-center">{quantityToBuy}</span>
          <button
            className={
              quantityToBuy < quantity!
                ? "bg-gray-300 px-3 py-0.5 rounded-full text-3xl font-light"
                : "bg-gray-200 px-3 py-0.5 rounded-full text-3xl font-light text-gray-500"
            }
            disabled={availability && quantityToBuy >= quantity!}
            onClick={() => {
              setQuantityToBuy(quantityToBuy + 1);
            }}
          >
            +
          </button>
        </div>
      </div>
      <br />
      <span className="font-bold text-lg">Rs. {price}</span>
      <div className="flex items-center mt-10">
        <Button
          className="bg-black text-white text-md whitespace-nowrap font-semibold rounded-none py-5 w-fit md:px-10 mr-8 flex"
          onClick={() => {
            setbuynow(true);
            addToCartHandler();
          }}
          disabled={loading}
        >
          Buy Now
        </Button>
        <Button
          className="bg-black text-white text-md whitespace-nowrap font-semibold rounded-none py-5 w-fit md:px-10 mr-8 flex"
          onClick={() => addToCartHandler()}
          disabled={loading}
        >
          <ShoppingCart className="mr-2" size={18} />
          Add to Cart
        </Button>
      </div>

      <div className="mt-8 flex">
        Available Stock:&nbsp;
        <p className={availability ? "" : "text-red-500"}>
          {availability ? quantity : "Out of Stock"}
        </p>
      </div>
    </>
  );
};

export default CartArea;
