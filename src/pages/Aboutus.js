import React from "react";
import { motion } from "framer-motion";
import About1 from "../assets/images/About1.png";
import About2 from "../assets/images/About2.png";
import { useTranslation } from "react-i18next";

function AboutUs() {
  const { t } = useTranslation();

  return (
    <div>
      <motion.div
        className="bg-[#92B344] py-10 px-4 md:px-20 text-center w-full"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          {t("about_us.title")}
        </h1>
      </motion.div>

      <section className="bg-[#F5F5F5] p-4 md:p-10 space-y-10 flex flex-col items-center">
        {/* Section 1 */}
        <div className="flex flex-col md:flex-row items-center md:space-x-10 space-y-6 md:space-y-0 max-w-screen-lg">
          <motion.div
            className="max-w-md text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* <p className="text-lg md:text-[20px] font-semibold text-[#050505] mb-5">
              {t("about_us.title")}
            </p> */}
            <motion.h2
              className="text-2xl md:text-[24px] font-semibold"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t("about_us.section_title_1")}
            </motion.h2>
            <motion.h3
              className="text-lg md:text-xl mt-4 font-semibold"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {t("about_us.mission_vision_title")}
            </motion.h3>
            <motion.p
              className="mt-4 text-sm md:text-[16px] leading-8 font-normal"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {t("about_us.mission_vision_content")}
            </motion.p>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <img
              src={About1}
              alt="About 1"
              className="w-full max-w-xs md:max-w-sm object-cover"
            />
          </motion.div>
        </div>

        {/* Section 2 */}
        <div className="flex flex-col md:flex-row items-center md:space-x-10 space-y-6 md:space-y-0 max-w-screen-lg">
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <img
              src={About2}
              alt="About 2"
              className="w-full max-w-xs md:max-w-sm object-cover"
            />
          </motion.div>
          <motion.div
            className="max-w-md text-center md:text-left"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.h2
              className="text-2xl md:text-[24px] font-semibold"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t("about_us.section_title_2")}
            </motion.h2>
            <motion.h3
              className="text-lg md:text-xl mt-4 font-semibold"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* {t("about_us.partner_title")} */}
            </motion.h3>
            <motion.p
              className="mt-4 text-sm md:text-[16px] leading-8 font-normal"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {t("about_us.partner_content")}
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
