import React from "react";
import { useTranslation } from "react-i18next";

const Roadmap = () => {
  const { t } = useTranslation();

  const milestones = t("roadmapPage.milestones", { returnObjects: true });

  return (
    <section className="py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-[36px] font-semibold text-[#517008] mb-4">
          {t("roadmapPage.title")}
        </h2>
        <div className="relative">
          <div className="absolute top-0 left-[3.5rem] transform -translate-x-1/2 w-4 bg-green-600 h-full hidden md:block"></div>
          <div className="space-y-12 relative">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center"
              >
                <div className="relative">
                  <div className="w-28 h-28 bg-gradient-to-br from-green-800 to-green-500 text-white flex items-center justify-center text-center rounded-full font-bold relative z-10">
                    {milestone.timeframe}
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:ml-10">
                  <p className="text-gray-700">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
