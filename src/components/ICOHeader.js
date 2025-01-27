import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Add this import
import Web3 from "web3";
import ICOABI from "../ABI/ICOABI.json";
// import USDTTestABI from "../ABI/USDTTestABI.json";
import USDTABI from "../ABI/USDTABI.json";
import CoinToken from "../assets/images/Coin Token.png";
import { motion } from "framer-motion";
import Coin from "../assets/images/Coin.png";
import { useTranslation } from "react-i18next";
import USDT from "../assets/images/usdt.png";
import ARROW from "../assets/images/arrow.png";
import GIVER from "../assets/images/giver.png";

const presaleContractAddress = "0xed5d051939cced4039aeac126cecf3fc4f445255";
const usdtContractAddress = "0x55d398326f99059fF775485246999027B3197955";
const formatAccount = (account) => {
  if (window.innerWidth < 500) {
    return `${account.slice(0, 6)}...${account.slice(-6)}`;
  }
  return account;
};
const Header = () => {
  const { wallet } = useParams(); // Get the wallet parameter from the URL
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [progress, setProgress] = useState(0);
  const [account, setAccount] = useState("");
  const [usdtAmount, setUsdtAmount] = useState("");
  const [message, setMessage] = useState("");
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [recommender, setRecommender] = useState(wallet || ""); // Set the recommender wallet address from the URL
  const givEstimate = usdtAmount * 100;

  // Countdown Timer
  useEffect(() => {
    const startDate = new Date("2025-01-01T23:59:59");
    const targetDate = new Date("2025-03-30T23:59:59");

    const countdown = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      const totalDuration = targetDate - startDate;
      const elapsed = now - startDate;
      const percentage = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(percentage);

      if (distance < 0) {
        clearInterval(countdown);
      } else {
        setTimeLeft({
          days: String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(
            2,
            "0"
          ),
          hours: String(
            Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          ).padStart(2, "0"),
          minutes: String(
            Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
          ).padStart(2, "0"),
          seconds: String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(
            2,
            "0"
          ),
        });
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  // Connect to MetaMask
  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        setMessage("MetaMask is connected!");
        fetchPurchaseHistory(accounts[0]); // Fetch purchase history on account connection
      } catch (error) {
        console.error("MetaMask connection error:", error);
        setMessage("Failed to connect MetaMask.");
      }
    } else {
      setMessage("Please install MetaMask!");
    }
  };

  // Fetch Purchase History
  const fetchPurchaseHistory = async (userAccount) => {
    if (!userAccount) return;

    try {
      const web3 = new Web3(window.ethereum);
      const presaleContract = new web3.eth.Contract(
        ICOABI,
        presaleContractAddress
      );

      const purchaseDetails = await presaleContract.methods
        .getPurchaseDetails(userAccount)
        .call();

      const tokenAmount = parseFloat(purchaseDetails[0]);
      const unlockTime = parseInt(purchaseDetails[1]);
      const claimed = purchaseDetails[2];

      if (tokenAmount > 0) {
        setPurchaseHistory([{ tokenAmount, unlockTime, claimed }]);
      } else {
        setPurchaseHistory([]);
      }
    } catch (error) {
      console.error("Error fetching purchase history:", error);
      setMessage(
        "Could not fetch purchase history. Please check your contract and connection."
      );
    }
  };

  const buyTokens = async () => {
    const usdtValue = parseFloat(usdtAmount);

    if (!account) {
      setMessage("Please connect your MetaMask wallet first.");
      return;
    }

    if (!usdtAmount || isNaN(usdtValue) || usdtValue <= 0) {
      setMessage("Please enter a valid USDT amount.");
      return;
    }

    if (recommender && !Web3.utils.isAddress(recommender)) {
      setMessage("Please enter a valid recommender wallet address.");
      return;
    }

    // Set default recommender wallet address if not provided
    const recommenderAddress =
      recommender || "0x6A712133765028065c15B480Cf4200126950dc3F";

    try {
      const web3 = new Web3(window.ethereum);
      const presaleContract = new web3.eth.Contract(
        ICOABI,
        presaleContractAddress
      );
      const usdtContract = new web3.eth.Contract(USDTABI, usdtContractAddress);

      const usdtBalance = await usdtContract.methods.balanceOf(account).call();
      if (parseFloat(web3.utils.fromWei(usdtBalance, "ether")) < usdtValue) {
        setMessage("Insufficient USDT balance.");
        return;
      }

      const allowance = await usdtContract.methods
        .allowance(account, presaleContractAddress)
        .call();

      if (parseFloat(web3.utils.fromWei(allowance, "ether")) < usdtValue) {
        setMessage("Approving USDT for the presale contract...");
        // Convert usdtAmount to wei
        const usdtAmountInWei = web3.utils.toWei(usdtAmount, "ether");
        await usdtContract.methods
          .approve(presaleContractAddress, usdtAmountInWei)
          .send({ from: account });
        setMessage("USDT approved successfully.");
      }

      setMessage("Processing your transaction..., Do not Close");

      const usdtAmountInWei = web3.utils.toWei(usdtAmount.toString(), "ether");
      await presaleContract.methods
        .buyTokens(usdtAmountInWei, recommenderAddress)
        .send({ from: account, gas: 300000 });

      setMessage("Transaction successful! Tokens purchased.");
      fetchPurchaseHistory(account);
    } catch (error) {
      console.error("Error buying tokens:", error);
      setMessage(`Error: ${error.message}`);
    }
  };

  // Claim Tokens
  const claimTokens = async (unlockTime, claimed) => {
    if (!account) {
      setMessage("Please connect your MetaMask wallet first.");
      return;
    }

    if (claimed) {
      setMessage("Tokens have already been claimed.");
      return;
    }

    try {
      const web3 = new Web3(window.ethereum);
      const presaleContract = new web3.eth.Contract(
        ICOABI,
        presaleContractAddress
      );

      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime < unlockTime) {
        setMessage("Tokens are still locked.");
        return;
      }

      setMessage("Claiming your tokens...");
      await presaleContract.methods
        .releaseTokens(account)
        .send({ from: account });
      setMessage("Tokens claimed successfully!");

      fetchPurchaseHistory(account);
    } catch (error) {
      console.error("Error claiming tokens:", error);
      setMessage(`Error: ${error.message}`);
    }
  };

  const { t } = useTranslation();

  return (
    <>
      <section className="bg-[#92B344] min-h-screen p-10 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left space-y-6 mb-6 md:mb-0">
          <h1 className="text-[36px] md:text-[50px] font-semibold text-white leading-tight">
            {t("icoPage.title")}
          </h1>
          <p className="text-[18px] md:text-[24px] text-white font-medium">
            {t("icoPage.slogan1")}
            <br />
            {t("icoPage.slogan2")}
          </p>

          <div className="space-y-4">
            <div className="flex justify-center md:justify-start space-x-11 text-white text-sm font-semibold">
              <span>Days</span>
              <span>Hours</span>
              <span>Minutes</span>
              <span>Seconds</span>
            </div>
            <div className="flex justify-center md:justify-start space-x-4 items-center text-center">
              {["days", "hours", "minutes", "seconds"].map((unit) => (
                <div key={unit} className="flex flex-col items-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white text-black text-xl md:text-2xl font-mono rounded-md flex items-center justify-center border border-gray-300">
                    {timeLeft[unit]}
                  </div>
                </div>
              ))}
            </div>
            <div className="relative mt-4 w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-600"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-[16px] md:text-[20px] font-medium text-white">
              {t("presalePage.buy_with")}
            </p>
            <a href="#buy-section">
              <div
                className="relative mt-6 md:mt-8 flex items-center"
                id="buy-section"
              >
                <motion.img
                  src={Coin}
                  alt="Coin"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] lg:w-[79px] lg:h-[79px] relative z-10 mr-2 md:mr-0"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="-ml-10 w-[130px] md:w-[150px] lg:w-[176px] h-[40px] md:h-[45px] lg:h-[47px] px-4 md:px-6 py-2 bg-green-950 text-white font-medium text-[14px] md:text-[16px] lg:text-[20px] rounded-full hover:bg-yellow-600"
                >
                  {t("presalePage.buy_button")}
                </motion.button>
              </div>
            </a>
          </div>
        </div>

        <motion.div
          animate={{
            opacity: 1,
            x: ["0%", "1%", "0%"],
            y: ["0%", "-2%", "0%"],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="w-full lg:w-1/2 p-4 mt-8 lg:mt-0"
        >
          <img
            src={CoinToken}
            alt="Coin"
            className="w-100 h-100 md:w-100 md:h-100 object-contain mx-auto"
          />
        </motion.div>

        {/* <div className="relative w-full md:w-1/2 flex justify-center items-center">
          <img
            src={CoinToken}
            alt="Coin"
            className="w-100 h-100 md:w-100 md:h-100 object-contain"
          />
        </div> */}
      </section>
      <div className="bg-[#92B344]  px-10 pb-10 items-center">
        <p className="text-[24px] md:text-[20px] text-white font-bold mb-4">
          {t("presalePage.join_us")} :
        </p>
        <div className="connect">
          <p className="text-[14px] md:text-[16px] font-medium text-white">
            1) {t("presalePage.connect_metamask")}:
          </p>
          <button
            onClick={connectMetaMask}
            className="my-4 w-full md:w-1/4  bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold rounded px-4 py-2 md:ml-8"
          >
            {account ? "Wallet Connected" : "Connect MetaMask"}
          </button>
        </div>
        {account ? (
          <>
            <p className="text-[14px] md:text-[16px] font-medium text-white">
              2) {t("presalePage.check_metamask")} :
            </p>
            <div className="text-white md:ml-8 my-4">
              {t("presalePage.your_account")} : {formatAccount(account)}
            </div>
            {purchaseHistory.length === 0 && (
              <div className="mt-2">
                <div>
                  <div>
                    <p className="text-[14px] md:text-[16px] font-medium text-white mb-5">
                      3) {t("icoPage.purchase")} :
                    </p>

                    <div className="flex justify-center items-center">
                      <div className="flex flex-col md:flex-row w-full md:w-3/4 space-x-0 md:space-x-4">
                        <div className="w-full md:w-2/5">
                          <img
                            src={USDT}
                            alt="tether"
                            className="h-24 md:h-48 w-auto mx-auto mb-2"
                          />
                          <p className="text-[14px] md:text-[16px] font-medium text-white mb-2">
                            {t("icoPage.enterusdt")}
                          </p>
                          <input
                            type="number"
                            placeholder="Enter USDT amount"
                            value={usdtAmount}
                            onChange={(e) => setUsdtAmount(e.target.value)}
                            className="w-full p-2 text-lg rounded border border-gray-400 h-10"
                          />
                          <p className="text-[14px] md:text-[16px] font-medium text-white mb-2">
                            Recommender Wallet Address (optional):
                          </p>
                          <input
                            type="text"
                            placeholder="Enter Recommender Wallet Address"
                            value={recommender}
                            onChange={(e) => setRecommender(e.target.value)}
                            className="w-full p-2 text-lg rounded border border-gray-400 h-10"
                          />
                        </div>
                        <div className="w-0 md:w-1/5 my-auto">
                          <img
                            src={ARROW}
                            alt="arrow"
                            className="h-36 mx-auto mb-14"
                          />
                        </div>
                        <div className="w-full mt-5 md:mt-0 md:w-2/5">
                          <img
                            src={GIVER}
                            alt="tether"
                            className="h-24 md:h-48 w-auto mx-auto mb-2"
                          />
                          <p className="text-[14px] md:text-[16px] font-medium text-white mb-2">
                            {t("icoPage.estimate")} : {givEstimate} GIV
                          </p>
                          <button
                            onClick={buyTokens}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full h-10"
                          >
                            {t("icoPage.buy")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {purchaseHistory.length > 0 && (
              <div>
                <p className="text-[14px] md:text-[16px] font-medium text-white">
                  3) {t("presalePage.purchased")} :
                </p>

                <ul className="mt-4 space-y-2 md:ml-8">
                  {purchaseHistory.map((purchase, index) => (
                    <li key={index} className="text-white">
                      {`Amount: ${
                        purchase.tokenAmount / 1000000000000000000
                      } GIV : Claim Your Tokens Here 
                      `}
                      <span className=" ml-2 mt-3 text-2xl text-red-600">
                        {"->"}
                      </span>
                      {!purchase.claimed &&
                        Math.floor(Date.now() / 1000) > purchase.unlockTime && (
                          <button
                            onClick={() =>
                              claimTokens(purchase.unlockTime, purchase.claimed)
                            }
                            className="md:ml-8 bg-green-900 hover:bg-green-600 transition-colors text-white text-2xl font-semibold rounded px-10 py-1"
                          >
                            Claim
                          </button>
                        )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : null}

        {message && (
          <p className="text-red-600 text-xl font-semibold mt-8 text-center">
            System Message : {message}
          </p>
        )}
      </div>
    </>
  );
};

export default Header;
