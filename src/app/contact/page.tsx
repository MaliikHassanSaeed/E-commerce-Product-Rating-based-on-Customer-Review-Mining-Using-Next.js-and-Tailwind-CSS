'use client';
import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    emailjs.send(
      'service_vynukqu',     
      'template_e2g9xqr',    
      {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
      },
      'fmhKmHfWT7GjFHLwV'      
    )
    .then(() => {
      alert("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    })
    .catch((err) => {
      console.error("Failed to send message:", err);
      alert("Failed to send message. Please try again later.");
    });
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row gap-8 max-w-5xl w-full bg-white p-6 rounded-2xl shadow-lg"
      >

        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex-1"
        >
          <h2 className="text-3xl font-bold mb-6">Let’s Talk

</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded-xl"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-3 border border-gray-300 rounded-xl"
              required
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={5}
              className="w-full p-3 border border-gray-300 rounded-xl"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-xl hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex-1 group transition duration-300"
        >
          <div className="transition transform group-hover:scale-105 group-hover:shadow-2xl group-hover:bg-blue-50 rounded-2xl p-4 duration-300">
            <h2 className="text-2xl font-semibold mb-4 group-hover:text-blue-700 transition">Our Address</h2>
            <p className="text-gray-700 group-hover:text-blue-800 transition">
              Makkah Mobile Zone (MMZ)<br />
              Mahi Chowk Near Canal Road<br />
              Tandlianwala District Faisalabad,<br />
              Pakistan
            </p>
            <h3 className="mt-6 text-xl font-medium group-hover:text-blue-700 transition">Email</h3>
            <a href="mailto:hscode56@gmail.com" className="text-gray-700 group-hover:text-blue-800 transition hover:text-blue-600">
              hscode56@gmail.com
            </a>
            <h3 className="mt-4 text-xl font-medium group-hover:text-blue-700 transition">Phone</h3>
            <p className="text-gray-700 group-hover:text-blue-800 transition">+92 300 1234567</p>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
