import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";

const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { t } = useTranslation();

  const faqs = [
    {
      question: "faq.faq1_question",
      answer: "faq.faq1_answer",
    },
    {
      question: "faq.faq2_question",
      answer: "faq.faq2_answer",
    },
    {
      question: "faq.faq3_question",
      answer: "faq.faq3_answer",
    },
  ];

  return (
    <section ref={ref} className="py-10 bg-gray-50 overflow-hidden">
      <h2 className="text-center text-xl md:text-2xl font-semibold mb-6">
        {t("faq.faq_title")} {/* Use translation key for title */}
      </h2>
      <div className="max-w-3xl mx-auto space-y-10 px-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-start md:space-x-4"
          >
            {/* Question Animation */}
            <motion.div
              className="flex justify-start w-full md:w-1/2"
              initial={{ opacity: 0, x: -100, visibility: "hidden" }}
              animate={
                isInView ? { opacity: 1, x: 0, visibility: "visible" } : {}
              }
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="bg-white rounded-full shadow-sm border border-gray-300 p-4 w-full max-w-full">
                <p className="font-medium text-sm md:text-[16px] text-gray-800">
                  {t(faq.question)} {/* Translate the question */}
                </p>
              </div>
            </motion.div>

            {/* Answer Animation */}
            <motion.div
              className="flex justify-end w-full md:w-1/2 mt-4 md:mt-10"
              initial={{ opacity: 0, x: 100, visibility: "hidden" }}
              animate={
                isInView ? { opacity: 1, x: 0, visibility: "visible" } : {}
              }
              transition={{ duration: 0.6, delay: index * 0.2 + 0.1 }}
            >
              <div className="bg-[#92B344] text-white rounded-3xl shadow-md p-4 w-full max-w-full">
                <p className="whitespace-pre-line text-sm md:text-[16px]">
                  {t(faq.answer)} {/* Translate the answer */}
                </p>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
