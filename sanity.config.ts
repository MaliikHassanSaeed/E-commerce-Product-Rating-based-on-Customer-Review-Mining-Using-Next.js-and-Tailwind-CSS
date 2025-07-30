import { schemas } from "@/sanity/schemas";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
export const config = defineConfig({
  projectId: process.env.PROJECT_ID!,
  dataset: process.env.DATASET!,
  title: "Hackathon1",
  basePath: "/admin",
  apiVersion: "2023-05-26",
  useCdn: true,
  plugins: [deskTool()],
  schema: { types: schemas },
});
