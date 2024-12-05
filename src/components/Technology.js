import React from "react";
import { useTranslation } from "react-i18next";
import BSC from "../assets/images/BSC.png";

const Technology = () => {
  const { t } = useTranslation();

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#517008] mb-4">
          {t("technologyPage.title")}
        </h2>
        <p className="text-xl sm:text-2xl font-normal mt-4">
          {t("technologyPage.platform")}
        </p>
        <p className="text-base sm:text-lg font-normal mt-4 indent-8 lg:indent-16">
          {t("technologyPage.description1")}
        </p>
        <p className="text-base sm:text-lg font-normal mt-4 indent-8 lg:indent-16">
          {t("technologyPage.description2")}
        </p>
        <div className="flex justify-center mt-6">
          <img
            src={BSC}
            alt={t("technologyPage.imageAltText")}
            className="w-full sm:max-w-[350px] lg:max-w-[450px] h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Technology;
