import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware();

export const config = {
  matcher: [
    "/cart",
    "/api/cart",
    "/api/cart/:id*",
    "/api/stripe-session",
    "/api/add-review",
    "/api/payment",
    "/api/review/[id]",
    "/api/review/:path*",
  ],
};
