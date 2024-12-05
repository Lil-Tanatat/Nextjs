import React from "react";
import ProjectOverview from "../components/ProjectOverView";
import ProblemStatement from "../components/ProblemStatement";
import UseCase from "../components/UseCase";
import Tokenomics from "../components/Tokenomics";
import Roadmap from "../components/RoadMap";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Technology from "../components/Technology";
import Governance from "../components/Governance";
import Development from "../components/Development";

const Whitepaper = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-[#F5F5F5]">
      <motion.div
        className="bg-[#92B344] py-10 px-4 md:px-20 text-center w-full"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          {t("Whitepaper")}
        </h1>
      </motion.div>
      <ProjectOverview />
      <ProblemStatement />
      <UseCase />
      <Tokenomics />
      <Technology />
      <Governance />
      <Roadmap />
      <Development />
    </div>
  );
};

export default Whitepaper;
