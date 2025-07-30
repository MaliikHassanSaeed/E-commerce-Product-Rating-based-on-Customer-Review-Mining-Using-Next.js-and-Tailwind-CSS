"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Mr. Akmal Rehan ",
    role: "Supervisor",
    position: "Position at UAF: Lecturer",
    contact: "akmalrehan@uaf.edu.pk",
    image: "/sup.jpg",
  },
  {
    name: "Muhammad Hassan Saeed",
    role: "Web Developer",
    position: "BS Software Engineering",
    contact: "muhammadhassansaeed9@gmail.com",
    image: "/last.JPEG",
  },
];

export default function AboutUsPage() {
  return (
    <>
      {/* Intro Section */}
      <section className="py-12">
        <h2 className="text-4xl font-bold text-center text-black mb-12">
          Behind the Code & Guidance
        </h2>
        <p className="text-xl text-center text-black mb-5">
          Meet the passionate team behind the MMZ project, dedicated to
          delivering innovation and excellence in mobile e-commerce.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-6xl mx-auto px-4 min-h-[400px]">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-lg text-center"
            >
              <Image
                src={member.image}
                alt={member.name}
                width={150}
                height={150}
                className="w-36 h-36 mx-auto rounded-full object-cover object-center border-4 border-blue-200 shadow-md"
              />
              <h3 className="text-xl font-semibold mt-4">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
              <p className="text-gray-500">{member.position}</p>
              <a
                href={`mailto:${member.contact}`}
                className="text-blue-600 mt-2 inline-block"
              >
                {member.contact}
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose MMZ Section */}
      <section className="relative text-center max-w-full mx-auto px-4 sm:px-6 lg:px-8 mb-12 bg-blue-50 overflow-hidden">
        {/* Top Gradient Shadow */}-
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white via-blue-50 to-transparent z-10"></div>

        <br />
        <br />
        <br />

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-black mb-6"
        >
          Why Choose MMZ?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-lg text-gray-700 mb-4 max-w-3xl mx-auto"
        >
          <p>
            Makkah Mobile Zone (MMZ) is dedicated to providing top-quality
            mobile phones at the best prices. Whether you are looking for the
            latest smartphone or a budget-friendly option, we have something
            for everyone.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-lg text-gray-700 mb-4 max-w-2xl mx-auto"
        >
          We offer secure payment options, fast delivery, and exceptional
          customer service to ensure the best shopping experience for our
          customers.
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-black mb-6 mt-16"
        >
          We Meet All Your Buying
          <br /> Needs Head On
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 max-w-6xl mx-auto">
          {[
            { label: "Tablet", animation: { x: -50 } },
            { label: "Charging Cables", animation: { x: -50 } },
            { label: "Airpods", animation: { x: 50 } },
            { label: "Smart Watches", animation: { x: 50 } },
            { label: "Power Banks", animation: { y: 40 } },
            { label: "Bluetooth Speakers", animation: { y: 40 } },
          ].map((item) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, ...item.animation }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{
                backgroundColor: "skyblue",
                borderColor: "#3b82f6",
                color: "white",
                transitionDuration: "2s",
              }}
              className="w-full max-w-[260px] h-52 border cursor-pointer border-gray-300 rounded-xl flex items-center justify-center text-center bg-white mx-auto"
            >
              <h3 className="text-xl font-semibold">{item.label}</h3>
            </motion.div>
          ))}
        </div>

        <br />
        <br />
        <br />

        {/* Bottom Gradient Shadow */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white via-blue-50 to-transparent z-10"></div>
      </section>

      {/* Our Values Section */}
      <div className="bg-white">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-black mb-6 mt-16 text-center"
        >
          Our Values
        </motion.h2>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 text-center">
            {[
              {
                icon: "/inspired.png",
                title: "Inspired",
                desc: "We love to try new things.\nWe connect everything to a greater vision.",
              },
              {
                icon: "/authentic.png",
                title: "Authentic",
                desc: "We remain honest and loyal.\nTransparency defines our culture.",
              },
              {
                icon: "/payment.png",
                title: "Secure Payment",
                desc: "Shop confidently with secure methods.\nYour transactions are always protected.",
              },
              {
                icon: "/together.png",
                title: "Together",
                desc: "We listen and respond to our customers.\nTogether we exceed expectations.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md"
              >
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="mb-4"
                />
                <h3 className="text-xl font-semibold text-black mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 whitespace-pre-line">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
