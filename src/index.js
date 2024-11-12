import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Presale from "./App";
import reportWebVitals from "./reportWebVitals";

import en from "./locales/en.json";
import th from "./locales/th.json";
import i18next from "i18next";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: {
      translation: en,
    },
    th: {
      translation: th,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <i18next.Provider i18n={i18next}> */}
    <Presale />
    {/* </i18next.Provider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
