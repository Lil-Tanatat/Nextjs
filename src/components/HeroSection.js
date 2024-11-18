import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import HeroCO2 from "../assets/images/HeroCO2.png";
import Coin from "../assets/images/Coin.png";
import HeroBackground from "../assets/images/HeroSmoke.png";

function HeroSection() {
  const { t } = useTranslation();

  return (
    <section
      className="text-left py-10 md:py-20 bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${HeroBackground}), linear-gradient(to bottom, #C5D8A4 30%, white 70%)`,
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="container mx-auto flex flex-col lg:flex-row items-center px-4 md:px-8">
        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full lg:w-1/2 p-4"
        >
          <h1 className="text-[32px] md:text-[48px] lg:text-[56px] font-medium leading-snug">
            The <span className="text-[#517008]">Giver</span> Token
          </h1>
          <p className="text-[14px] md:text-[18px] lg:text-[20px] font-normal mt-4 md:mt-6">
            {t("is a digital token used for carbon credit trading on the")}{" "}
            <span className="text-[20px] md:text-[28px] lg:text-[36px] text-[#517008]">
              {t("Giver")}
            </span>{" "}
            {t("platform.")}
          </p>
          <p className="text-[14px] md:text-[18px] lg:text-[20px] font-normal mt-2 md:mt-4">
            {t(
              "It aims to make transactions more efficient, secure, and eco-friendly by shifting from paper-based to digital processes."
            )}
          </p>
          <p className="text-[14px] md:text-[18px] lg:text-[20px] font-normal mt-2 md:mt-4">
            {t(
              "Giver leverages blockchain and smart contracts to ensure transparency and connect carbon credit buyers with sellers easily."
            )}
          </p>
          <div className="relative mt-6 md:mt-8 flex items-center">
            <motion.img
              src={Coin}
              alt="Coin"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] lg:w-[79px] lg:h-[79px] relative z-10"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="-ml-10 w-[130px] md:w-[150px] lg:w-[176px] h-[40px] md:h-[45px] lg:h-[47px] px-4 md:px-6 py-2 bg-[#92B344] text-white font-medium text-[14px] md:text-[16px] lg:text-[20px] rounded-full hover:bg-yellow-600"
            >
              {t("Token Sale")}
            </motion.button>
          </div>
        </motion.div>

        {/* Image content with float effect */}
        <motion.div
          animate={{
            opacity: 1,
            x: 0,
            y: ["0%", "-5%", "0%"],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="w-full lg:w-1/2 p-4 mt-8 lg:mt-0"
        >
          <img src={HeroCO2} alt={t("Giver Token")} className="w-full h-auto" />
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
