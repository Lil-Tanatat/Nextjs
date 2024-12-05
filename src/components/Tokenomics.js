import React from "react";
import { PieChart } from "react-minimal-pie-chart";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Bonus from "../assets/images/Bonus.png";
import Sale from "../assets/images/20.png";
import Burn from "../assets/images/15.png";

const Tokenomics = () => {
  const { t } = useTranslation();
  const data = [
    { title: t("tokenomics.preSale"), value: 10, color: "#D2EBA9" },
    { title: "ICO", value: 15, color: "#D3FA79" },
    { title: t("tokenomics.developer"), value: 5, color: "#A4CC47" },
    {
      title: t("tokenomics.marketing"),
      value: 20,
      color: "#8CB62B",
    },
    { title: t("tokenomics.lock"), value: 25, color: "#517008" },
    { title: t("tokenomics.reward"), value: 25, color: "#70951A" },
  ];

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#517008] mb-4">
          Tokenomics
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div
            className="relative mb-10"
            style={{
              width: "100%",
              maxWidth: "554px",
              height: "auto",
              maxHeight: "553px",
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <PieChart
                data={data}
                lineWidth={30}
                startAngle={270}
                animate
                style={{ height: "100%", width: "100%" }}
              />
            </motion.div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.p
                className="text-xl sm:text-2xl md:text-3xl font-semibold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {t("tokenomics.total")}
              </motion.p>
              <motion.p
                className="text-xl sm:text-2xl md:text-3xl font-semibold mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                5,000,000,000
              </motion.p>
              <motion.p
                className="text-xl sm:text-2xl md:text-3xl font-semibold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {t("tokenomics.total")}
              </motion.p>
            </div>
          </div>
          <div className="text-left space-y-2 md:text-lg">
            {data.map((segment, index) => (
              <motion.p
                key={index}
                className="text-sm sm:text-base md:text-lg text-gray-700 flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
              >
                <span
                  className="inline-block w-4 h-4 mr-2 rounded-full"
                  style={{ backgroundColor: segment.color }}
                ></span>
                {segment.title}:{" "}
                <span className="font-bold ml-1">{segment.value}%</span>
              </motion.p>
            ))}
          </div>
        </div>
        <p className="text-base sm:text-lg md:text-xl font-normal mt-4 indent-8 lg:indent-16">
          <span className="font-semibold text-[#517008]">
            {t("tokenomics.presale")}
          </span>
          {t("tokenomics.control")}
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <img
            src={Bonus}
            alt="Bonus"
            className="w-full sm:max-w-[220px] lg:max-w-[300px] h-auto"
          />
          <img
            src={Sale}
            alt="Sale"
            className="w-full sm:max-w-[220px] lg:max-w-[300px] h-auto"
          />
        </div>
        <p className="text-2xl sm:text-3xl md:text-4xl font-semibold mt-6">
          {t("tokenomics.burn")}
        </p>

        <div className="flex flex-wrap items-center justify-center space-x-4 mt-6">
          <img
            src={Burn}
            alt="Burn"
            className="w-full sm:max-w-[220px] lg:max-w-[300px] h-auto"
          />
          <p className="text-base sm:text-lg md:text-xl font-normal indent-8 lg:indent-16 mt-4 sm:mt-0">
            {" "}
            {t("tokenomics.burnDescription")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;
