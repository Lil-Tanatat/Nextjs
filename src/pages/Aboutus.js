import React from "react";
import { motion } from "framer-motion";
import About1 from "../assets/images/About1.png";
import About2 from "../assets/images/About2.png";

function AboutUs() {
  return (
    <div>
      <div className="bg-[#92B344] py-10 px-4 md:px-20 text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-white">About Us</h1>
      </div>

      <section className="bg-[#F5F5F5] p-4 md:p-10 space-y-10 flex flex-col items-center">
        <div className="flex flex-col md:flex-row items-center md:space-x-10 space-y-6 md:space-y-0 max-w-screen-lg">
          <motion.div
            className="max-w-md text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg md:text-[20px] font-semibold text-[#050505]">About us</p>
            <motion.h2
              className="text-2xl md:text-[24px] font-semibold"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              It Is A Critical Component
              <br />
              Of <span className="text-[#517008]">Modern</span> Business
            </motion.h2>
            <motion.h3
              className="text-lg md:text-xl mt-4 font-semibold"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Mission & Vision
            </motion.h3>
            <motion.p
              className="mt-4 text-sm md:text-[20px] font-normal"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Our team recognizes the issue of global warming and wants to be
              part of the movement towards achieving net-zero emissions.
              However, the current carbon credit trading system still uses paper
              and plastic money, which generates significant carbon emissions
              during production. Therefore, we have adopted blockchain
              technology for carbon credit trading to reduce the use of fiat
              currency.
            </motion.p>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <img src={About1} alt="About 1" className="w-full max-w-xs md:max-w-sm object-cover" />
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row items-center md:space-x-10 space-y-6 md:space-y-0 max-w-screen-lg">
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <img src={About2} alt="About 2" className="w-full max-w-xs md:max-w-sm object-cover" />
          </motion.div>
          <motion.div
            className="max-w-md text-center md:text-left"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.h2
              className="text-2xl md:text-[24px] font-semibold"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              It Is A Critical Component Of<br />
              <span className="text-[#517008]">Modern</span> Business
            </motion.h2>
            <motion.h3
              className="text-lg md:text-xl mt-4 font-semibold"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Partner & Collaborators
            </motion.h3>
            <motion.p
              className="mt-4 text-sm md:text-[20px] font-normal"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Our partners are a team of experts in waste management, both on
              land and at sea. They have identified ways to reduce and offset
              carbon dioxide emissions. The development team and our partners
              have therefore collaborated to create this project.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
