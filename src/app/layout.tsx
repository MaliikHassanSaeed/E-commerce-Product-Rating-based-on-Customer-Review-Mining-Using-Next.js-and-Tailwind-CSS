// app/layout.tsx (✅ fixed font import only)

import "./globals.css";
import Navbar from "@/components/common/navbar/Navbar";
import Footer from "@/components/common/footer/Footer";
import Bottom from "@/components/bottom/Bottom";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import ReduxProvider from "@/components/reduxProvider/ReduxProvider";
import { sora } from "@/lib/fonts"; // ✅ fixed

export const metadata = {
  title: "MMZ",
  description: "Ignite Your Wardrobe with FABulous clothes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={sora.className}>
          <ReduxProvider>
            <Navbar />
          </ReduxProvider>
          {children}
          <Bottom />
          <Footer />
          <Toaster position="bottom-center" />
        </body>
      </html>
    </ClerkProvider>
  );
}
