import React from "react";
import { useTranslation } from "react-i18next";

const ProblemStatement = () => {
  const { t } = useTranslation();

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#517008] mb-4">
          {t("problemStatement.title")}
        </h2>
        <p className="text-base sm:text-lg lg:text-xl font-normal mt-4 indent-8 lg:indent-16">
          {t("problemStatement.description1")}
        </p>
        <p className="text-base sm:text-lg lg:text-xl font-normal mt-4 indent-8 lg:indent-16">
          {t("problemStatement.description2")}
        </p>
        <p className="text-base sm:text-lg lg:text-xl font-normal mt-4 indent-8 lg:indent-16">
          {t("problemStatement.description3")}
        </p>
      </div>
    </section>
  );
};

export default ProblemStatement;
