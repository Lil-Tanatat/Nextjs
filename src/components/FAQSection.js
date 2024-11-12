import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const faqs = [
  { 
    question: "What will the funds raised be used for?", 
    answer: "The funds will be used to purchase carbon credits from farmers and provide financial support to farmers who have not yet joined the T-VER project. This aims to promote greenhouse gas reduction and create sustainability for farming communities."
  },
  { 
    question: "Why are the tokens locked for 2 years?", 
    answer: "Since this project requires considerable time and coordination with multiple parties, we are locking the tokens for 2 years to ensure stability in the project's execution. During this 2-year period, the tokens will remain locked, and investors will receive a 20% bonus when the tokens are unlocked."
  },
  { 
    question: "What are the special benefits for those who purchase tokens during the Pre-sale?", 
    answer: "Those who purchase tokens during the Pre-sale will receive several exclusive benefits, including:\n • Access to the Stake Pool 3 months before IDO investors\n • Early access to the Carbon Credit trading platform 3 months ahead of general investors\n • Their names will be recorded in the Pre-sale database, giving them faster access to additional special privileges in the future."
  }
];

const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-10 bg-gray-50">
      <h2 className="text-center text-xl md:text-2xl font-semibold mb-6">Presale FAQ about Fundraising and Tokens</h2>
      <div className="max-w-3xl mx-auto space-y-10 px-4">
        {faqs.map((faq, index) => (
          <div key={index} className="flex flex-col md:flex-row items-start md:space-x-4">
            {/* Question Animation */}
            <motion.div
              className="flex justify-start w-full md:w-1/2"
              initial={{ opacity: 0, x: -100 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="bg-white rounded-full shadow-sm border border-gray-300 p-4 max-w-xs w-full">
                <p className="font-medium text-sm md:text-[16px] text-gray-800">Q: {faq.question}</p>
              </div>
            </motion.div>
            
            {/* Answer Animation */}
            <motion.div
              className="flex justify-end w-full md:w-1/2 mt-4 md:mt-10"
              initial={{ opacity: 0, x: 100 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.1 }}
            >
              <div className="bg-[#92B344] text-white rounded-3xl shadow-md p-4 max-w-xs w-full">
                <p className="whitespace-pre-line text-sm md:text-[16px]">{faq.answer}</p>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
