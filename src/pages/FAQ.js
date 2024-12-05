import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const FAQ = () => {
  const { t } = useTranslation();

  const [openItems, setOpenItems] = useState([]); // Keeps track of open FAQ items

  const toggleItem = (index) => {
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter((item) => item !== index));
    } else {
      setOpenItems([...openItems, index]);
    }
  };

  const faqData = [
    {
      question: "Why a 2-year token lock?",
      answer: "Explanation about token lock.",
    },
    {
      question: "What will the funds be used for?",
      answer:
        "To buy carbon credits from farmers and support them in reducing greenhouse gases.",
    },
    {
      question: "Pre-sale benefits?",
      answer:
        "Early access to the Stake Pool and trading platform, plus a record in the Pre-sale database for future privileges.",
    },
    {
      question: "Why a 2-year token lock?",
      answer: "Explanation about token lock.",
    },
    {
      question: "What will the funds be used for?",
      answer:
        "To buy carbon credits from farmers and support them in reducing greenhouse gases.",
    },
    {
      question: "What will the funds be used for?",
      answer:
        "To buy carbon credits from farmers and support them in reducing greenhouse gases.",
    },
  ];

  return (
    <div className="bg-[#F5F5F5]">
      <motion.div
        className="bg-[#92B344] py-10 px-4 md:px-20 text-center w-full"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          {t("FAQ")}
        </h1>
      </motion.div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
        {/* FAQ Section */}
        <div className="col-span-2">
          <h1 className="text-[32px] font-bold text-[#517008] mb-6">
            Get help?
          </h1>
          {faqData.map((item, index) => (
            <div
              key={index}
              className="border-b border-gray-300 py-4 cursor-pointer"
              onClick={() => toggleItem(index)}
            >
              <div className="flex items-center">
                <span className="text-2xl mr-5 bg-[#517008] text-white w-[27px] h-[27px] flex items-center justify-center rounded-lg">
                  {openItems.includes(index) ? "-" : "+"}
                </span>
                <h2 className="text-xl font-medium text-[#517008]">
                  {item.question}
                </h2>
              </div>
              {openItems.includes(index) && (
                <p className="mt-2 text-gray-700">{item.answer}</p>
              )}
            </div>
          ))}
        </div>

        {/* Quick Links Section */}
        <div>
          <h2 className="text-[32px] font-bold text-[#517008] mb-4">
            Quick Links
          </h2>
          <div className="p-6 mb-6 bg-[#92B3444D] rounded-xl">
            <h3 className="text-[24px] font-semibold text-[#517008]">
              Join Community
            </h3>
            <p className="text-[#517008] mb-2">
              Post in our lively forum for quick help with apps, or just share
              your app!
            </p>
          </div>
          <div className="p-6 bg-[#92B3444D] rounded-xl">
            <h3 className="text-[24px] font-semibold text-[#517008]">
              Read Documentation
            </h3>
            <p className="text-[16px] font-medium text-[#517008]">
              Learn at your own pace.
            </p>
            <ul className="mt-2 space-y-3">
              <li>
                <p className="text-[16px] font-medium text-[#517008]">
                  White Paper EN Version.
                </p>
                <button className="text-[13px] bg-[#517008] text-white py-2 px-4 rounded-3xl hover:bg-green-700">
                  Download white paper
                </button>
              </li>
              <li>
                <p className="text-[16px] font-medium text-[#517008]">
                  White Paper TH Version.
                </p>
                <button className="text-[13px] bg-[#517008] text-white py-2 px-4 rounded-3xl hover:bg-green-700">
                  Download white paper
                </button>
              </li>
              <li>
                <p className="text-[16px] font-medium text-[#517008]">
                  How Our Platform work EN Version.
                </p>
                <button className="text-[13px] bg-[#517008] text-white py-2 px-4 rounded-3xl hover:bg-green-700">
                  Download white paper
                </button>
              </li>
              <li>
                <p className="text-[16px] font-medium text-[#517008]">
                  How Our Platform work TH Version.
                </p>
                <button className="text-[13px] bg-[#517008] text-white py-2 px-4 rounded-3xl hover:bg-green-700">
                  Download white paper
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
