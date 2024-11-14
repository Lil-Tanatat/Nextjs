import React from "react";
import { motion } from "framer-motion";
import LogoImage from "../assets/images/coming-soon-logo.png";
import { Link } from "react-router-dom";

function ComingSoon() {
  return (
    <div>
      <div className="bg-[#92B344] py-10 px-4 md:px-20 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white">
          Coming Soon
        </h1>
      </div>

      <section className="bg-[#F5F5F5] p-4 md:p-10 flex flex-col items-center space-y-10">
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={LogoImage}
            alt="Coming Soon Logo"
            className="w-48 max-w-48 md:max-w-48 object-cover"
          />
        </motion.div>

        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-[#517008]">
            Stay Tuned for Something Amazing
          </h2>
          <p className="mt-4 text-lg md:text-xl text-[#050505] font-normal">
            We’re working hard behind the scenes to bring you an exciting new
            experience. Join us soon to be part of our journey toward innovation
            and impact.
          </p>
        </motion.div>
        <Link to="/" className="mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-full bg-[#517008] hover:bg-yellow-600 text-white text-lg font-semibold shadow-md"
          >
            Back Home
          </motion.button>
        </Link>
      </section>
    </div>
  );
}

export default ComingSoon;
