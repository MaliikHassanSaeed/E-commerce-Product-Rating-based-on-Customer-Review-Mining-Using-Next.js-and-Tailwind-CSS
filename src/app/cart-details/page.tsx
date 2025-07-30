"use client";
import { urlFor } from "@/sanity/sanity-utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { deleteFromCart } from "@/slices/cartSlice";
import getStipePromise from "../../lib/stripe";
import { useRouter } from "next/navigation";

const Cart = () => {
  const quantity = useAppSelector((state) => state.cart.totalQuantity);
  const sub_total = useAppSelector((state) => state.cart.subTotal);
  const products = useAppSelector((state) => state.cart.product);
  const pending = useAppSelector((state) => state.cart.pending);
  const dispatch = useAppDispatch();

  const handleCheckout = async () => {
    const stripe = await getStipePromise();
    const response = await fetch("/api/stripe-session/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
      body: JSON.stringify(products),
    });

    const data = await response.json();
    if (data.session) {
      stripe?.redirectToCheckout({ sessionId: data.session.id });
    }
  };
  const router = useRouter();

  return (
    <>
      {pending ? (
        <div className=""></div>
      ) : products.length > 0 ? (
        <div className="px-3 lg:px-40 relative">
          <h3 className="text-2xl font-bold mt-20">Shopping Cart</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-8 gap-8">
            {products.map((prod, i) => (
              <div
                className="col-span-2 flex justify-between md:h-48 border-b pb-5 border-b-black lg:border-0"
                key={i}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="aspect-square h-48 relative mb-5 lg:mb-0">
                    <Image
                      src={urlFor(prod.images).url()}
                      fill
                      alt=""
                      className="rounded-2xl"
                    />
                  </div>
                  <div className="ml-8 flex flex-col justify-between">
                    <div className="flex">
                      <h4 className="text-xl font-light ">{prod.name}</h4>
                      <h4 className="text-xl font-light bg-black text-white ml-3 px-2">
                        x{prod.quantity}
                      </h4>
                    </div>
                    <span className="font-bold text-[#412e2e]">
                      {prod.category}
                      <br />
                    </span>

                    <span className="font-semibold">Delivery Estimation</span>
                    <span className="font-semibold text-[#FFD239]">
                      5 working Days
                    </span>
                    <span className="font-semibold">$ {prod.price}</span>
                  </div>
                </div>
                <div className="flex flex-col justify-between justify-self-end lg:pr-8">
                  <button
                    onClick={() => {
                      dispatch(deleteFromCart(prod._id));
                    }}
                  >
                    <Trash2 size={25} className="self-end cursor-pointer" />
                  </button>
                  <span className="font-bold bg-[#412e2e] text-white w-fit p-2.5">
                    {prod.color}
                  </span>
                </div>
              </div>
            ))}
            <div className="col-span-1 min-h-48 bg-[#F2F3F7] py-5 px-8 lg:row-start-1 lg:col-start-3 md:col-span-2 lg:col-span-1">
              <h3 className="text-lg font-bold">Order Summary</h3>
              <div className="flex justify-between my-5">
                <div className="flex flex-col justify-evenly space-y-3">
                  <h4>Quantity</h4>
                  <h4>Sub Total</h4>
                </div>
                <div className="flex flex-col justify-evenly items-end space-y-3">
                  <span>{quantity} product</span>
                  <span>$ {sub_total}</span>
                </div>
              </div>
              <Button
                className="bg-black text-white text-md font-semibold rounded-none py-8 md:py-5 md:px-12 mr-8 flex w-full"
                onClick={() => {
                  router.push("/checkout");
                }}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[50vh] flex flex-col justify-center items-center">
          <ShoppingBag size={72} />
          <h2 className="text-4xl font-bold">Your shopping bag is empty.</h2>
        </div>
      )}
    </>
  );
};

export default Cart;