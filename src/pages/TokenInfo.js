import React from "react";
import TokenomicsSection from "../components/TokenomicsSection";
import { useTranslation } from "react-i18next";
import CoinToken from "../assets/images/Coin Token.png";
import { motion } from "framer-motion";

function TokenInfo() {
  const { t } = useTranslation();

  return (
    <div className="bg-[#F5F5F5]">
      {/* Header */}
      <div className="bg-[#92B344] py-10 px-4 md:px-20 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          {t("Token Information")}
        </h1>
      </div>

      {/* Tokenomics Section */}
      <div data-aos="fade-up">
        <TokenomicsSection />
      </div>

      {/* Token Use Case Section */}
      <div className="flex items-center justify-center mt-10">
        <div
          className="bg-[#517008] max-w-7xl h-[562px] text-white flex flex-col md:flex-row items-center px-10 md:px-20 rounded-xl mb-10 shadow-lg"
          data-aos="fade-up"
        >
          {/* Left Content */}
          <div className="flex-1 flex flex-col justify-center items-center text-center md:text-left md:items-start mb-6 md:mb-0 md:pr-5">
            <h2 className="text-2xl md:text-3xl font-semibold">
              {t("Token Use Case")}
            </h2>
            <p className="mt-4 text-lg md:text-xl">
              {t(
                "The Giver token is designed exclusively as a medium for buying and selling carbon credits on the Giver platform. The token’s price will fluctuate based on demand and supply. Token holders can benefit from the token’s price changes."
              )}
            </p>
          </div>

          {/* Right Image with Looping Motion */}
          <div className="flex-1 flex justify-center">
            <motion.img
              src={CoinToken}
              alt="Giver Token Coin"
              className="w-56 h-56 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-112 lg:h-112 object-contain mx-auto"
              animate={{
                opacity: 1,
                x: ["0%", "1%", "0%"],
                y: ["0%", "-2%", "0%"],
              }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TokenInfo;