export const PRODUCTS_SCHEMA = {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "description",
      title: "Product Description",
      type: "text",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image" }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "brand",
      title: "Product Brand",
      type: "reference",
      to: [{ type: "brand" }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "category",
      title: "Product Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "colors",
      title: "Colors",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "hexCode",
              title: "Hex Code",
              type: "string",
              validation: (Rule: any) =>
                Rule.regex(/^#[0-9A-Fa-f]{6}$/, {
                  name: "hex",
                  invert: false,
                }).required(),
            },
            {
              name: "colorName",
              title: "Color Name",
              type: "string",
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "colorName",
              subtitle: "hexCode",
            },
          },
        },
      ],
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: "currentStock",
      title: "Current Stock",
      type: "number",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "availability",
      title: "Availability",
      type: "boolean",
      validation: (Rule: any) => Rule.required(),
    },
  ],
};
