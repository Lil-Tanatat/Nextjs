import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import BG1 from "../assets/images/BG_1.png";

const benefits = [
  {
    title: "20% Bonus",
    description:
      "on the total number of tokens purchased during this Presale period.",
  },
  {
    title: "Exclusive Access to Our Service",
    description:
      "after Joining Our Presale you will get exclusive access to our service. and be our whitelisted member.",
  },
  {
    title: "Priority Access to Carbon Credit Trading",
    description:
      "when the Giver platform is launched, you will be the first to experience it.",
  },
];

const Benefits = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="py-10 mt-20 px-4 md:px-0">
      <h2 className="text-center text-[24px] md:text-[32px] font-bold mb-10 md:mb-20">
        Benefits of Participating in the{" "}
        <span className="text-[#92B344]">Giver</span> Token Presale
      </h2>

      <section
        ref={ref}
        className="bg-cover bg-center w-full h-auto md:h-[411px] flex justify-center items-center py-10"
        style={{
          backgroundImage: `url(${BG1})`,
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-white bg-opacity-70 shadow-lg p-6 rounded-md w-full max-w-[400px] md:max-w-[456px] h-auto md:h-[221px] text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <h3 className="mt-2 text-[22px] md:text-[28px] font-semibold">
                {benefit.title}
              </h3>
              <p className="text-[16px] md:text-[18px] font-normal mt-4">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Benefits;
