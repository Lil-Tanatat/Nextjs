import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import BG1 from "../assets/images/BG_1.png";
import { useTranslation } from "react-i18next";

const benefits = [
  {
    titleKey: "benefits.benefit1_title",
    descriptionKey: "benefits.benefit1_description",
  },
  {
    titleKey: "benefits.benefit2_title",
    descriptionKey: "benefits.benefit2_description",
  },
];

const BenefitsICO = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { t } = useTranslation();

  return (
    <div className="py-10 mt-20 px-4 md:px-0 lg:px-0">
      <h2 className="text-center text-[24px] md:text-[32px] lg:text-[36px] font-bold mb-10 md:mb-16">
        {t("benefits.benefits_title")}{" "}
        <span className="text-[#92B344]">{t("benefits.token_name")}</span>{" "}
        {t("benefits.token_presale")}
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
              className="bg-white bg-opacity-80 shadow-lg p-2 rounded-md w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[350px] h-auto text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <h3 className="mt-2 text-[20px] md:text-[24px] lg:text-[28px] font-semibold">
                {t(benefit.titleKey)}
              </h3>
              <p className="text-[14px] md:text-[16px] lg:text-[18px] font-normal mt-4">
                {t(benefit.descriptionKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BenefitsICO;
