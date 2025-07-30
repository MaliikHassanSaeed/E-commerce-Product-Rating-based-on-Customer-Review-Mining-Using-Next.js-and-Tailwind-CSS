import { Sora } from "next/font/google";
import Hero from "@/sections/home/hero/Hero";
import Promotions from "@/sections/home/promotions/Promotions";
import Newsletter from "@/sections/home/newsletter/Newsletter";
import Products from "@/sections/home/products/Products";
import Promo from "@/sections/home/promo/Promo";
import TopText from "@/components/home/topText/TopText";
const sora = Sora({ subsets: ["latin"] });
export default function Home() {
  return (
    <main className={sora.className}>
      <TopText />
      <Hero />
      <Promotions />
      <Products />
      <Promo />
      <Newsletter />
    </main>
  );
}
