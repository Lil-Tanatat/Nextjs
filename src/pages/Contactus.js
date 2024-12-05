import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import Global from "../assets/images/GlobalHand.png";
import Smoke from "../assets/images/HeroSmoke.png";
import { useTranslation } from "react-i18next";

const Contactus = () => {
  const { t } = useTranslation();
  const formRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_s9ex53q", // Replace with your service ID
        "template_bmnrq6s", // Replace with your template ID
        formRef.current,
        "n-7szFMgJis2MVXQF" // Replace with your public key
      )
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
          setIsModalOpen(true); // Open the modal on success
          formRef.current.reset();
        },
        (error) => {
          console.log("Error sending email:", error.text);
          alert("Failed to send the message. Please try again later.");
        }
      );
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section
      className="text-left py-10 md:py-20 bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${Smoke}), linear-gradient(to bottom, #C5D8A4 30%, white 70%)`,
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-4 md:px-0 max-w-screen-lg relative z-2">
        <div className="absolute top-0 w-full md:w-4/4 h-8 bg-[#517008] z-0 md:block hidden"></div>

        <motion.div
          className="bg-white shadow-lg p-8 w-full md:w-1/2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-[#92B344] text-4xl font-semibold mb-3 mt-3">
            {t("contactUsPage.title")}
          </h2>
          <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
            <div className="relative">
              <span className="absolute left-4 top-3 text-gray-300">
                <i className="fas fa-user"></i>
              </span>
              <input
                type="text"
                name="user_name"
                placeholder={t("contactUsPage.name")}
                className="w-full pl-10 p-3 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-green-400 bg-[#ECF4D9]"
                required
              />
            </div>
            <div className="relative">
              <span className="absolute left-4 top-3 text-gray-300">
                <i className="fas fa-envelope"></i>
              </span>
              <input
                type="email"
                name="user_email"
                placeholder={t("contactUsPage.email")}
                className="w-full pl-10 p-3 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-green-400 bg-[#ECF4D9]"
                required
              />
            </div>
            <div>
              <textarea
                name="message"
                placeholder={t("contactUsPage.message")}
                rows="4"
                className="w-full p-3 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-green-400 bg-[#ECF4D9]"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#97C52C] text-white py-3 rounded-3xl hover:bg-green-700 transition"
            >
              {t("contactUsPage.submit")}
            </button>
          </form>
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={Global}
            alt="Earth and hands"
            className="w-[513px] h-full object-cover"
          />
        </motion.div>
      </div>

      {/* Success Modal */}
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg text-center w-[90%] max-w-md"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            exit={{ y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <h3 className="text-xl font-bold mb-4 text-green-600">
              {t("contactUsPage.messageSent")}!
            </h3>
            <p className="text-gray-700">{t("contactUsPage.thankyou")}</p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              {t("contactUsPage.close")}
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Contactus;
