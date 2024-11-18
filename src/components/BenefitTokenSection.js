import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import BG1 from "../assets/images/BG_1.png";

const benefits = [
  { title: "20% Bonus", description: "on the total number of tokens purchased during this Presale period." },
  { title: "Exclusive Access to Stake Pool", description: "one quarter ahead of ICO participants, with a special interest rate of 29% per annum." },
  { title: "Priority Access to Carbon Credit Trading", description: "on the Giver platform one quarter before regular token holders." },
];

const Benefits = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="py-10 mt-20 px-4 md:px-8 lg:px-16">
      <h2 className="text-center text-[24px] md:text-[32px] lg:text-[36px] font-bold mb-10 md:mb-16">
        Benefits of Participating in the <span className="text-[#92B344]">Giver</span> Token Presale
      </h2>

      <section
        ref={ref}
        className="bg-cover bg-center w-full h-auto flex justify-center items-center py-10 md:py-16"
        style={{
          backgroundImage: `url(${BG1})`,
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="flex flex-col lg:flex-row justify-center gap-6 md:gap-8 lg:gap-10 max-w-screen-lg">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-white bg-opacity-80 shadow-lg p-6 rounded-md w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[350px] h-auto text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <h3 className="mt-2 text-[20px] md:text-[24px] lg:text-[28px] font-semibold">{benefit.title}</h3>
              <p className="text-[14px] md:text-[16px] lg:text-[18px] font-normal mt-4">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Benefits;
