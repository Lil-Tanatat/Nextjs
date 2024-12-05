import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Roadmap = () => {
  const { t } = useTranslation();
  const roadmapData = [
    {
      period: t("roadmap.steps.0.period"),
      date: t("roadmap.steps.0.date"),
      description: t("roadmap.steps.0.description"),
    },
    {
      period: t("roadmap.steps.1.period"),
      date: t("roadmap.steps.1.date"),
      description: t("roadmap.steps.1.description"),
    },
    {
      period: t("roadmap.steps.2.period"),
      date: t("roadmap.steps.2.date"),
      description: t("roadmap.steps.2.description"),
    },
    {
      period: t("roadmap.steps.3.period"),
      date: t("roadmap.steps.3.date"),
      description: t("roadmap.steps.3.description"),
    },
    {
      period: t("roadmap.steps.4.period"),
      date: t("roadmap.steps.4.date"),
      description: t("roadmap.steps.4.description"),
    },
  ];

  const colors = [
    "bg-[#A2CA44]",
    "bg-[#8CB62B]",
    "bg-[#71971B]",
    "bg-[#628412]",
    "bg-[#364A07]",
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.2, // Delay animation per index
        duration: 0.6,
      },
    }),
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#F5F5F5]">
      {/* Title */}
      <motion.div
        className="bg-[#92B344] py-10 px-4 md:px-20 text-center w-full"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          {t("roadmap.title")}
        </h1>
      </motion.div>

      {/* Timeline */}
      <div className="relative w-full max-w-5xl mt-10">
        {/* Vertical Line with gradient */}
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 h-[90%] md:h-[90%] w-2 bg-gradient-to-t from-[#364A07] to-[#A2CC44]"></div>

        {roadmapData.map((item, index) => (
          <motion.div
            key={index}
            className={`relative flex flex-col sm:flex-row items-center mb-24 ${
              index % 2 === 0 ? "sm:justify-start" : "sm:justify-end"
            }`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={index}
            variants={cardVariants}
          >
            {/* Circle with dynamic color */}
            <div
              className={`w-[120px] h-[120px] sm:w-[180px] sm:h-[180px] ${colors[index]} text-white rounded-full flex flex-col items-center justify-center font-bold text-[16px] sm:text-[24px] shadow-md z-2`}
            >
              {item.period}
              <h2 className="text-[12px] sm:text-[18px]">{item.date}</h2>
            </div>

            {/* Card */}
            <div
              className={`shadow-lg rounded-lg p-4 sm:p-6 w-full sm:w-80 ${
                colors[index]
              } ${index % 2 === 0 ? "order-2" : "order-1"}`}
            >
              <p className="text-[white] mt-2">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;
