import React from "react";
import { PieChart } from "react-minimal-pie-chart";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import Fire from "../assets/images/Fire.png";

function TokenomicsSection() {
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
    <section className="w-full py-16 px-4">
      <div className="w-full text-center">
        <motion.h2
          className="text-[28px] md:text-[32px] font-bold mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("tokenomics.title")}
        </motion.h2>
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
                className="text-[20px] md:text-[40px] font-semibold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {t("tokenomics.total")}
              </motion.p>
              <motion.p
                className=" text-[20px] md:text-[40px] font-semibold mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                5,000,000,000
              </motion.p>
              <motion.p
                className=" text-[20px] md:text-[40px] font-semibold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {t("tokenomics.token")}
              </motion.p>
            </div>
          </div>
          <div className="text-left space-y-2 md:text-lg">
            {data.map((segment, index) => (
              <motion.p
                key={index}
                className="text-sm md:text-lg text-gray-700 flex items-center"
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

        <motion.div
          className="mt-8 bg-[#92B344] py-6 px-4 md:px-8 text-white w-full flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="w-full md:w-3/4 text-left ml-4 md:ml-10">
            <motion.p
              className="text-[16px] md:text-[20px] font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              {t("tokenomics.price")}
            </motion.p>
            <ul className="list-disc ml-4 md:ml-6 text-[14px] md:text-[16px] mt-2 space-y-1">
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                {t("tokenomics.description1")}
              </motion.li>
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                {t("tokenomics.description2")}
              </motion.li>
            </ul>
          </div>

          <div className="hidden md:block border-l-2 border-white h-28 mx-4" />

          <div className="w-full md:w-1/4 items-center text-sm font-semibold flex flex-col space-y-2">
            <motion.div
              className="flex flex-row items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={Fire}
                alt="Fire"
                className="w-[50px] md:w-[63px] h-[50px] md:h-[68px]"
              />
              <p className="text-[20px] md:text-[20px] font-semibold">
                {t("tokenomics.burnTarget")}
              </p>
            </motion.div>
            <motion.p
              className="text-[20px] md:text-[24px] font-medium text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <span className="block md:inline">2,000,000,000</span>
              <span className="block md:inline md:ml-2">
                {t("tokenomics.token")}
              </span>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default TokenomicsSection;
