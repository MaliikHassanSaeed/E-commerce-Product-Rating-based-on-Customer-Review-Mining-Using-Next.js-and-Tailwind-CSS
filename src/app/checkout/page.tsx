"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import paymentQRCode from "./../../../public/QR.jpeg";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearCart, deleteFromCart } from "@/slices/cartSlice";

const pakistanProvinces = [
  "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Gilgit-Baltistan",
  "Azad Jammu and Kashmir",
];

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  contactNo: Yup.string()
    .matches(
      /^\+923[0-4][0-9]{8}$/,
      "Invalid Pakistan mobile number (e.g., +923001234567)"
    )
    .required("Contact number is required"),
  address: Yup.string()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters"),
  city: Yup.string().required("City is required"),
  province: Yup.string().required("Province is required"),
  paymentMethod: Yup.string().required("Please select a payment method"),
  transactionScreenshot: Yup.mixed().when("paymentMethod", {
    is: "Online",
    then: (schema) =>
      schema
        .required("Transaction screenshot is required for online payment")
        .test(
          "fileFormat",
          "Only PNG, JPG, or JPEG files are allowed",
          (value) => {
            if (!value || !(value instanceof File)) return false;
            const supportedFormats = ["image/png", "image/jpeg", "image/jpg"];
            return supportedFormats.includes(value.type);
          }
        )
        .test("fileSize", "File size must be less than 5MB", (value) => {
          if (!value || !(value instanceof File)) return false;
          return value.size <= 5 * 1024 * 1024;
        }),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const UserForm = () => {
  const dispatch = useAppDispatch();
  const cartData = useAppSelector((state) => state.cart.product);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      contactNo: "",
      address: "",
      city: "",
      province: "",
      country: "Pakistan",
      paymentMethod: "",
      transaction_screenshot: "Hassan Meesna",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await fetch("/api/payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ values, cartData }),
        });

        const result = await response.json();

        if (response.ok) {
          alert(`
            Order submitted successfully! Order ID: ${result.orderId} by user => ${result.userId}
         `);
          resetForm();
          dispatch(clearCart());
        } else {
          alert(
            `Error: ${result.error}\nDetails: ${JSON.stringify(
              result.details,
              null,
              2
            )}`
          );
        }
      } catch (error: any) {
        alert(`Network error: ${error.message}`);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const quantity = useAppSelector((state) => state.cart.totalQuantity);
  const sub_total = useAppSelector((state) => state.cart.subTotal);

  return (
    <div className="grid grid-cols-2 gap-6 min-h-screen my-10">
      <div className="w-full mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
        <h2 className="text-2xl font-bold text-center mb-6">
          User Information Form
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.name}
              </div>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="contactNo"
              className="block text-sm font-medium text-gray-700"
            >
              Contact Number
            </label>
            <input
              type="text"
              id="contactNo"
              name="contactNo"
              placeholder="+923001234567"
              value={formik.values.contactNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            {formik.touched.contactNo && formik.errors.contactNo ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.contactNo}
              </div>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            {formik.touched.address && formik.errors.address ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.address}
              </div>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            {formik.touched.city && formik.errors.city ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.city}
              </div>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="province"
              className="block text-sm font-medium text-gray-700"
            >
              Province
            </label>
            <select
              id="province"
              name="province"
              value={formik.values.province}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select a province</option>
              {pakistanProvinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
            {formik.touched.province && formik.errors.province ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.province}
              </div>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formik.values.country}
              readOnly
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Payment Method
            </label>
            <div className="mt-2 space-y-2 flex justify-evenly">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={formik.values.paymentMethod === "COD"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="form-radio h-4 w-4 text-indigo-600"
                />
                <span className="ml-2">Cash on Delivery (COD)</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Online"
                  checked={formik.values.paymentMethod === "Online"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="form-radio h-4 w-4 text-indigo-600"
                />
                <span className="ml-2">Online Payment</span>
              </label>
            </div>
            {formik.touched.paymentMethod && formik.errors.paymentMethod ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.paymentMethod}
              </div>
            ) : null}
          </div>

          {formik.values.paymentMethod === "Online" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Scan QR Code for Payment
                </label>
                <Image
                  src={paymentQRCode}
                  alt="Payment QR Code"
                  className="mt-2 w-[75%] mx-auto border border-gray-300 rounded-md"
                />
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Please scan the QR code to make the payment.
                </p>
              </div>

              <div>
                <label
                  htmlFor="transactionScreenshot"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload Transaction Screenshot
                </label>
                <input
                  type="file"
                  id="transactionScreenshot"
                  name="transactionScreenshot"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={(event) => {
                    formik.setFieldValue(
                      "transactionScreenshot",
                      event.currentTarget.files[0]
                    );
                  }}
                  onBlur={formik.handleBlur}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                {formik.touched.transaction_screenshot &&
                formik.errors.transaction_screenshot ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.transaction_screenshot}
                  </div>
                ) : null}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="flex items-start justify-center w-full">
        <div className="sticky top-1/2 -translate-y-1/2 bg-gray-100 p-6 rounded-lg shadow-md text-center w-[75%]">
          <div className="w-full min-h-48 bg-[#F2F3F7] py-5 px-8 lg:row-start-1 lg:col-start-3 md:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-bold">Order Summary</h3>
            <div className="flex justify-between my-5">
              <div className="flex flex-col justify-evenly space-y-3">
                <h4 className="font-semibold">Quantity:</h4>
                <h4 className="font-semibold">Sub Total:</h4>
              </div>
              <div className="flex flex-col justify-evenly items-end space-y-3">
                <span>{quantity} product</span>
                <span>Rs. {sub_total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
