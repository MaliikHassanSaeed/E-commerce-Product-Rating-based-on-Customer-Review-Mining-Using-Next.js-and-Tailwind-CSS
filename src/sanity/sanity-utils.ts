import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { ProductInCart } from "@/slices/cartSlice";


export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  }[];
  category?: string;
  currentStock: number;
  availability: boolean;
}

export type ProductsData = Product[];

// Create a Sanity client
const client = createClient({
  projectId: process.env.PROJECT_ID!,
  dataset: process.env.DATASET,
  useCdn: true, // Enable CDN if available for faster responses
  apiVersion: "2023-04-30",
});
const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);
// Function to fetch data from Sanity
export async function fetchData(docs_quantity?: number) {
  if (!docs_quantity) {
    try {
      // Define your query
      const query = `*[_type == "product"]{
      _id,
      name,
      category:category->title,
      price,
      "images":images[0],
      gender
    }`;

      // Fetch data using the query
      const data = await client.fetch(query);

      // Process the fetched data

      // Return or further process the data as needed
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error scenarios
    }
  } else {
    try {
      // Define your query
      const query = `*[_type == "product" && lower(category->title) in ["airpods", "headphones"]]{
  _id,
  name,
  "category": category->title,
  price,
  "images": images[0]
}`;

      // Fetch data using the query and pass the gender as a parameter
      const data = await client.fetch(query, { docs_quantity });

      // Process the fetched data

      // Return or further process the data as needed
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error scenarios
    }
  }
}
export async function getProducts({
  category,
  brand,
}: {
  category?: string;
  brand?: string;
}) {
  // Input normalization (case-insensitive)
  const categoryFilter = category ? category.toLowerCase() : null;
  const brandFilter = brand ? brand.toLowerCase() : null;

  // Build the GROQ query dynamically
  let query = '*[_type == "product"';

  // Add category filter if provided
  if (categoryFilter) {
    query +=
      ' && defined(category->title) && lower(category->title) == "' +
      categoryFilter +
      '"';
  }

  // Add brand filter if provided
  if (brandFilter) {
    query +=
      ' && defined(brand->title) && lower(brand->title) == "' +
      brandFilter +
      '"';
  }

  query += `]{
    _id,
    name,
    "category": category->title,
    "brand": brand->title,
    price,
    description,
    "images": images[0].asset->url
  }`;

  // Execute the query
  const products = await client.fetch(query);

  return products;
}

export const fetchSingleProduct = async (id: string) => {
  try {
    const query = `*[_type == "product"&& _id == $id]{
    _id,name,images,price,description,"category":category->title,"brand":brand->title, colors,currentStock, availability
    }`;

    // Fetch data using the query
    const data = await client.fetch<ProductsData>(query, { id });

    // Return the fetched data
    return data[0];
  } catch (error) {}
};

export const fetchProductInCart = async (id: string[]) => {
  try {
    const query = `*[_type == "product"&& _id in $id]{
      "product_id":_id,
      name,
      "images":images[0],
      price,
      description,
      "category":category->title,
      "availableQuantity":quantity
    }`;

    // Fetch data using the query
    const data = await client.fetch<ProductInCart[]>(query, { id });
    console.log(data);
    return data;
  } catch (error) {}
};