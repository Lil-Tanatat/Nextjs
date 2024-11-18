import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next"; // Import the useTranslation hook
import Carbon1 from "../assets/images/Carbon Credit 1.png";
import Carbon2 from "../assets/images/Carbon Credit 2.png";
import Leaf from "../assets/images/leaf.png";

function BenefitsSection() {
  const { t } = useTranslation(); // Initialize the translation hook

  // Animation variants for fade and float effects
  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
  };

  const float = {
    animate: {
      y: [0, -10, 0],
      transition: { duration: 2, ease: "easeInOut", repeat: Infinity },
    },
  };

  return (
    <section className="py-16 bg-white">
      <div className="w-full flex flex-col items-center">
        <h2 className="text-[24px] sm:text-[32px] md:text-[40px] font-bold text-center mb-12">
          {t("Benefits of the")}{" "}
          <span className="text-[#517008]">{t("Carbon Credit")}</span>
        </h2>

        {/* Benefit 1 - Text Left, Image Right */}
        <div className="flex flex-col lg:flex-row items-center lg:justify-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-0">
          {/* Left Text Section */}
          <div className="lg:w-1/2 flex flex-col items-center lg:items-end text-center lg:text-right mt-6 lg:mt-0">
            <div className="relative flex items-center justify-end mb-4">
              <div className="bg-[#92B344] text-white text-[50px] sm:text-[85px] font-bold w-[100px] sm:w-[150px] h-[60px] sm:h-[108px] flex items-center justify-center clip-arrow-left">
                01
              </div>
              <motion.img
                src={Leaf}
                alt={t("Leaf")}
                className="absolute top-[-10px] sm:top-[-28px] left-[-20px] sm:left-[-40px] w-[50px] sm:w-[105px] h-[50px] sm:h-[105px] transform rotate-[-30deg]"
                variants={float}
                animate="animate"
              />
            </div>
            <h3 className="text-[20px] sm:text-[24px] md:text-[32px] font-bold text-[#517008] mb-4 px-4 lg:px-10">
              {t("Carbon Credit Trading")}
            </h3>
            <p className="text-[14px] sm:text-[16px] font-normal mb-6 leading-relaxed px-4 lg:px-10">
              {t(
                "The Giver Token platform streamlines secure, transparent carbon credit trading via blockchain, enabling global transactions without geographical limits. It connects users to the growing carbon credit market, helping reduce emissions and support certified carbon reduction projects."
              )}
            </p>
            <motion.button
              className="mr-0 lg:mr-10 px-4 py-2 rounded border border-black hover:bg-green-700 hover:text-white transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("Learn more")}
            </motion.button>
          </div>

          {/* Right Image Section */}
          <motion.img
            src={Carbon1}
            alt={t("Carbon Credit Trading")}
            className="w-[80%] sm:w-[70%] md:w-[60%] lg:w-[50%] h-auto max-h-[463px] object-cover shadow-lg mx-0"
            variants={fadeInScale}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          />
        </div>

        {/* Benefit 2 - Text Right, Image Left */}
        <div className="flex flex-col lg:flex-row-reverse items-center lg:justify-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-0 mt-5 lg:mt-0">
          {/* Right Text Section */}
          <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left mt-6 lg:mt-0">
            <div className="relative flex items-center mb-4">
              <div className="bg-[#92B344] text-white text-[50px] sm:text-[85px] font-bold w-[100px] sm:w-[150px] h-[60px] sm:h-[108px] flex items-center justify-center clip-arrow-right">
                02
              </div>
              <motion.img
                src={Leaf}
                alt={t("Leaf")}
                className="absolute top-[-10px] sm:top-[-28px] right-[-20px] sm:right-[-40px] w-[50px] sm:w-[105px] h-[50px] sm:h-[105px]"
                style={{ rotate: "100deg" }}
                variants={float}
                animate="animate"
              />
            </div>
            <h3 className="text-[20px] sm:text-[24px] md:text-[32px] font-bold text-[#517008] mb-4 px-4 lg:px-10">
              {t("Net Zero Together")}
            </h3>
            <p className="text-[14px] sm:text-[16px] font-normal mb-6 leading-relaxed px-4 lg:px-10">
              {t("Net Zero Together Description")}
            </p>
            <motion.button
              className="ml-0 lg:ml-10 px-4 py-2 rounded border border-black hover:bg-green-700 hover:text-white transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("Learn more")}
            </motion.button>
          </div>

          {/* Left Image Section */}
          <motion.img
            src={Carbon2}
            alt={t("Net Zero Together")}
            className="w-[80%] sm:w-[70%] md:w-[60%] lg:w-[50%] h-auto max-h-[463px] object-cover shadow-lg mx-0"
            variants={fadeInScale}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          />
        </div>
      </div>
    </section>
  );
}

export default BenefitsSection;
