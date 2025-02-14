import React from "react";
import { useTranslation } from "react-i18next"; // Import the useTranslation hook

function StepsSection() {
  const { t, i18n } = useTranslation(); // Initialize the translation hook

  const steps = [
    {
      title: t("howTo.step1Header"),
      description: t("howTo.step1Description"),
    },
    {
      title: t("howTo.step2Header"),
      description: t("howTo.step2Description"),
    },
    {
      title: t("howTo.step3Header"),
      description: t("howTo.step3Description"),
    },
    {
      title: t("howTo.step4Header"),
      description: t("howTo.step4Description"),
    },
  ];

  const colors = [
    "bg-[#517008]",
    "bg-[#70951A]",
    "bg-[#8CB62B]",
    "bg-[#A4CC47]",
  ];

  const textcolors = [
    "text-[#517008]",
    "text-[#70951A]",
    "text-[#8CB62B]",
    "text-[#A4CC47]",
  ];

  return (
    <section className="py-36 w-full flex justify-center">
      <div className="w-full flex flex-col items-center">
        <div className="text-center mb-28">
          <h2 className="text-3xl sm:text-4xl font-bold">
            {t("howTo.how")}{" "}
            <span className="text-[#517008]">{t("giver")}</span>{" "}
            {/* Conditionally render "Works" based on language */}
            {i18n.language === "en" ? t("howTo.works") : ""}
          </h2>

          <p className="mt-7 text-lg sm:text-xl font-semibold text-[#92B344]">
            {t("howTo.subHeader")}
          </p>
        </div>
        <div className="flex flex-col md:flex-row w-full relative gap-0">
          {/* White Line with Shadow */}
          <div className="absolute md:top-3 md:left-0 md:right-0 md:h-2 h-full md:bg-white bg-transparent z-10 w-full md:w-[70%] mx-auto shadow-2xl" />
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative flex flex-col items-center justify-center p-8 rounded-3xl shadow-2xl ${
                colors[index]
              } w-full h-[340px] ${index !== 0 ? "md:-ml-8" : ""} z-${
                index + 1
              }`}
            >
              <div className="absolute top-6 -mt-16 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white text-[96px] rounded-full flex items-center justify-center text-2xl sm:text-3xl md:text-4xl font-bold shadow-2xl z-20">
                <span
                  className={`${textcolors[index]} text-4xl sm:text-5xl md:text-6xl font-bold`}
                >
                  {index + 1}
                </span>
              </div>
              <h3 className="mt-10 text-lg sm:text-xl font-semibold text-white text-center">
                {step.title}
              </h3>
              <p className="mt-5 text-gray-200 text-center max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StepsSection;
