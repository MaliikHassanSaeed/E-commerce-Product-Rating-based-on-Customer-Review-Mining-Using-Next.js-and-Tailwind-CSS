"use client";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../ui/navigation-menu";
import Link from "next/link";
import logo from "./../../../../public/FAB logo.jpg";
import { sora } from "@/lib/fonts";
import { useEffect, useState } from "react";
import { Spin as Hamburger } from "hamburger-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCartData } from "@/slices/cartSlice";
import { motion } from "framer-motion";
const Navbar = () => {
  const [isNavbar, setIsNavbar] = useState<boolean>(false);
  const [atTop, setAtTop] = useState<boolean>(true);
  const { totalQuantity, pending } = useAppSelector((state) => state.cart);
  const subTotal = useAppSelector((state) => state.cart.subTotal);
  console.log("🚀 ~ file: Navbar.tsx:29 ~ Navbar ~ subTotal:", subTotal);
  const dispatch = useAppDispatch();
  const { userId } = useAuth();
  useEffect(() => {
    if (userId) {
      dispatch(fetchCartData());
    }
  }, [userId, dispatch]);
  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 50) {
        setAtTop(false);
      } else {
        setAtTop(true);
      }
    };
  });
  return (
    <>
      <div className="w-full flex justify-center items-center bg-black py-4">
        <div className="overflow-hidden">
          <motion.p
            className="text-xl text-white tracking-widest"
            initial={{ x: "100%", opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              transition: { duration: 1.5, type: "spring", delay: 0.2 },
            }}
          >
            Upgrade Your Mobile, Not Your Budget
          </motion.p>
        </div>
      </div>
      <nav
        className={`flex justify-between items-center px-5 lg:px-20 h-24 sticky top-0 bg-white ${
          atTop ? "" : "shadow-xl"
        } w-full transition-all duration-500 z-[1000000]`}
      >
        {!isNavbar && (
          <Link href={"/"}>
            <Image
              src={logo}
              className="rounded-full  w-20 aspect-square"
              alt="FAB Threads Logo"
              title="FABthreads Logo"
              priority
            />
          </Link>
        )}
        <div className="lg:flex hidden">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem className="space-x-12">
                <Link href={"/phone?category=phone"} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${sora.className} text-lg tracking-wider uppercase`}
                  >
                    smartphones
                  </NavigationMenuLink>
                </Link>
                <Link href={"/airpods?category=airpods"} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${sora.className} text-lg tracking-wider uppercase`}
                  >
                    airpods
                  </NavigationMenuLink>
                </Link>
                <Link href={"/allProducts"} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${sora.className} text-lg tracking-wider uppercase`}
                  >
                    All Products
                  </NavigationMenuLink>
                </Link>
                <Link href={"/contact"} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${sora.className} text-lg tracking-wider uppercase`}
                  >
                    CONTACT US
                  </NavigationMenuLink>
                </Link>
                 <Link href={"/about"} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${sora.className} text-lg tracking-wider uppercase`}
                  >
                    ABOUT US
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex justify-center items-center gap-x-8">
          <div className="p-2.5 rounded-full bg-gray-300 lg:flex hidden relative">
            <Link href={"/cart-details"} className="cursor-pointer">
              <>
                <ShoppingCart className="relative" />
                <span
                  className={
                    pending
                      ? "absolute -top-2.5 -right-2 h-6 w-6 text-center rounded-full bg-[#f02d34] text-white animate-ping"
                      : "absolute -top-2.5 -right-2 h-6 w-6 text-center rounded-full bg-[#f02d34] text-white"
                  }
                >
                  {totalQuantity}
                </span>
              </>
            </Link>
          </div>
          <div className="hidden lg:block">
            <SignedIn>
              {/* Mount the UserButton component */}
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              {/* Signed out users get sign in button */}
              <SignInButton />
            </SignedOut>
          </div>
        </div>
        <div
          className={
            !isNavbar
              ? "lg:hidden absolute right-5 z-50 "
              : "lg:hidden fixed right-5 z-50"
          }
        >
          <Hamburger
            toggled={isNavbar}
            onToggle={() => setIsNavbar(!isNavbar)}
          />{" "}
        </div>
        {isNavbar && (
          <div className="flex flex-col w-screen h-screen fixed top-0 left-0 p-6 bg-white z-40">
            {/* <Image
            src={logo}
            alt="logo"
            className="rounded-full  w-20 aspect-square"
            priority
          /> */}
            <div className="flex flex-col h-full justify-center items-center">
              <div className="mb-5 ml-3">
                <SignedIn>
                  {/* Mount the UserButton component */}
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
                <SignedOut>
                  {/* Signed out users get sign in button */}
                  <SignInButton />
                </SignedOut>
              </div>
              <div className="p-2 rounded-full bg-gray-300 flex w-fit relative">
                <Link href={"/cart-details"}>
                  <>
                    <ShoppingCart className="" />
                    <span className="absolute -top-2 -right-2 h-6 w-6 text-center rounded-full bg-[#f02d34] text-white">
                      {totalQuantity}
                    </span>
                  </>
                </Link>
              </div>
              <NavigationMenu className="max-h-40">
                <NavigationMenuList>
                  <NavigationMenuItem className="space-y-2 flex flex-col text-lg text-center h-32">
                    <Link href={"/phone"} legacyBehavior passHref>
                      <NavigationMenuLink className={sora.className}>
                        SmartPhones
                      </NavigationMenuLink>
                    </Link>
                    <Link href={"/airpods"} legacyBehavior passHref>
                      <NavigationMenuLink className={sora.className}>
                        Airpods
                      </NavigationMenuLink>
                    </Link>
                    <Link href={"/allProducts"} legacyBehavior passHref>
                      <NavigationMenuLink className={sora.className}>
                        All Products
                      </NavigationMenuLink>
                    </Link>
                    <Link href={"/contact"} legacyBehavior passHref>
                      <NavigationMenuLink className={sora.className}>
                        Contact Us
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
