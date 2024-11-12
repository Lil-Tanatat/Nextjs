import React from 'react';
import { motion } from "framer-motion";
import Header from '../components/Header';
import Benefits from '../components/BenefitTokenSection';
import FAQ from '../components/FAQSection';
import InvestmentFundsSection from '../components/Investment';

function TokenSale() {
  return (
    <div className="font-sans text-gray-800 bg-[#F5F5F5]">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Header />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Benefits />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <InvestmentFundsSection />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <FAQ />
      </motion.div>
    </div>
  );
}

export default TokenSale;
