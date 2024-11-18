import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import Photo_1 from "../assets/images/Photo_1.png";
import Photo_2 from "../assets/images/Photo_2.png";

const InvestmentFundsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { t } = useTranslation();

  return (
    <section className="py-12 px-4 md:px-0" ref={ref}>
      <div className="max-w-5xl mx-auto text-center">
        {/* Title */}
        <motion.h2
          className="text-xl md:text-2xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          {t("investmentFunds.title")} {/* Use the translation key */}
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-gray-600 mb-6 text-sm md:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t("investmentFunds.description")} {/* Use the translation key */}
        </motion.p>
      </div>

      {/* Image Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        <motion.img
          src={Photo_1}
          alt={t("investmentFunds.photo1Alt")}
          className="w-full h-auto rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
          }
          transition={{ duration: 0.6, delay: 0.4 }}
        />
        <motion.img
          src={Photo_2}
          alt={t("investmentFunds.photo2Alt")}
          className="w-full h-auto rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
          }
          transition={{ duration: 0.6, delay: 0.6 }}
        />
      </div>
    </section>
  );
};

export default InvestmentFundsSection;
