import React from "react";
import { useTranslation } from "react-i18next";

const UseCase = () => {
  const { t } = useTranslation();

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#517008] mb-4">
          {t("useCase.title")}
        </h2>
        <p className="text-base sm:text-lg lg:text-xl font-normal mt-4 indent-8 lg:indent-16">
          {t("useCase.description1")}
        </p>
        <p className="text-base sm:text-lg lg:text-xl font-normal mt-4 indent-8 lg:indent-16">
          {t("useCase.description2")}
        </p>
        <p className="text-base sm:text-lg lg:text-xl font-semibold mt-10 indent-8 lg:indent-16 text-center">
          {t("useCase.greenConversion")}{" "}
          <span className="font-semibold">
            1 tCO<sub>2</sub>eq
          </span>
        </p>
        <p className="text-base sm:text-lg lg:text-xl font-normal mt-4 text-center">
          {t("useCase.description3")}
        </p>
      </div>
    </section>
  );
};

export default UseCase;
