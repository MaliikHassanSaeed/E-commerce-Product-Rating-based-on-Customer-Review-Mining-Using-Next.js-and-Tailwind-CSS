import { cart } from "@/lib/drizzle";
import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_PORT === "465", // true for port 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    console.log("🚀 ~ POST ~ body:", body);
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized: User not authenticated" },
        { status: 401 }
      );
    }

    // Validate body structure
    const { cartData, values } = body;
    if (!cartData || !values) {
      return NextResponse.json(
        { error: "Missing cartData or values in request body" },
        { status: 400 }
      );
    }

    // Insert data into the user_orders table
    const { rows } = await sql`
      INSERT INTO user_orders (
        name, email, contact_no, address, city, province, country, 
        payment_method, transaction_screenshot_path, status, user_id
      ) VALUES (
        ${values.name},
        ${values.email},
        ${values.contactNo},
        ${values.address},
        ${values.city},
        ${values.province}::province_type,
        ${values.country},
        ${values.paymentMethod}::payment_method_type,
        ${values.transaction_screenshot},
        'pending'::status_type,
        ${userId}
      ) RETURNING id, created_at, user_id;
    `;

    // Delete cart items for the user
    const db = drizzle(sql);
    await db.delete(cart).where(eq(cart.user_id, userId));

    // Prepare email content
    const cartItemsHtml = cartData
      .map(
        (item: {
          name: string;
          quantity: number;
          price: number;
          size: string;
        }) => `
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">${
              item.name || "N/A"
            }</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${
              item.quantity || 1
            }</td>
            <td style="border: 1px solid #ddd; padding: 8px;">RS${
              item.price || 0
            }</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${
              item.size || 0
            }</td>
          </tr>
        `
      )
      .join("");

    const emailHtml = `
      <h2>New Order Placed</h2>
      <h3>User Details</h3>
      <ul>
        <li><strong>Name:</strong> ${values.name || "N/A"}</li>
        <li><strong>Email:</strong> ${values.email || "N/A"}</li>
        <li><strong>Contact No:</strong> ${values.contactNo || "N/A"}</li>
        <li><strong>Address:</strong> ${values.address || "N/A"}</li>
        <li><strong>City:</strong> ${values.city || "N/A"}</li>
        <li><strong>Province:</strong> ${values.province || "N/A"}</li>
        <li><strong>Country:</strong> ${values.country || "N/A"}</li>
        <li><strong>Payment Method:</strong> ${
          values.paymentMethod || "N/A"
        }</li>
      </ul>
      <h3>Products to Buy</h3>
      <table style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px;">Product Name</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Price</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Color</th>
          </tr>
        </thead>
        <tbody>
          ${cartItemsHtml}
        </tbody>
      </table>
    `;

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: "hscode56@gmail.com", // Send to admin or user
      subject: `New Order #${rows[0].id} Placed`,
      html: emailHtml,
    });

    return NextResponse.json(
      {
        message: "Order created successfully and email sent",
        orderId: rows[0].id,
        createdAt: rows[0].created_at,
        userId: rows[0].user_id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating order or sending email:", error);
    return NextResponse.json(
      { error: "Failed to create order or send email", details: error.message },
      { status: 500 }
    );
  }
}
