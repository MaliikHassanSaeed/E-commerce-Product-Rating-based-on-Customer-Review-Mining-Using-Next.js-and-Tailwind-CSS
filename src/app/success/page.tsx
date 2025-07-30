import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import ConfettiProvider from "./ConfettiProvider";

const CheckoutSuccess = () => {
  return (
    <>
      <div className="w-screen h-screen absolute top-0 left-0 z-0 ">
        <ConfettiProvider />{" "}
      </div>
      <div className="success min-h-[50vh] flex flex-col justify-center items-center z-10 relative">
        <h1 className="text-3xl font-bold">Thank you for your order!</h1>
        <p className="description">
          If you have any questions, please email:&nbsp;
          <a
            href="mailto:hscode56@gmail.com "
            className=" text-blue-500 underline hover:text-blue-800"
          >
            hscode56@gmail.com 
          </a>
        </p>
        <Link
          href={"/allProducts"}
          className="bg-black text-white text-md font-semibold rounded-none py-5 w-fit px-8 mt-10 flex"
        >
          <ShoppingCart className="mr-2" />
          Continue Shopping
        </Link>
      </div>
    </>
  );
};
export default CheckoutSuccess;
