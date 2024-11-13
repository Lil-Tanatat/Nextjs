import React, { useEffect, useState } from "react";
import Web3 from "web3";
import GIVPreSaleABI from "../ABI/GIVPreSaleABI.json";
import USDTABI from "../ABI/USDTABI.json";
import CoinToken from "../assets/images/Coin Token.png";
import { motion } from "framer-motion";
import Coin from "../assets/images/Coin.png";

const presaleContractAddress = "0x21EAA23a845BbaC45b0Ce05CA091a0A78b716753";
const usdtContractAddress = "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd";

const Header = () => {
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

  // Countdown Timer
  useEffect(() => {
    const startDate = new Date("2024-10-30T23:59:59");
    const targetDate = new Date("2024-12-31T23:59:59");

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
        GIVPreSaleABI,
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

    try {
      const web3 = new Web3(window.ethereum);
      const presaleContract = new web3.eth.Contract(
        GIVPreSaleABI,
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
        .buyTokens(usdtAmountInWei)
        .send({ from: account, gas: 200000 });

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
        GIVPreSaleABI,
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

  return (
    <>
      <section className="bg-[#92B344] min-h-screen p-10 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left space-y-6 mb-6 md:mb-0">
          <h1 className="text-[36px] md:text-[50px] font-semibold text-white leading-tight">
            Join the Giver Token Pre-sale
          </h1>
          <p className="text-[18px] md:text-[24px] text-white font-medium">
            Go Greener with Giver
            <br />
            in the future of sustainable carbon trading
          </p>

          <div className="space-y-4">
            <div className="flex justify-center md:justify-start space-x-4 text-white text-sm font-semibold">
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
              Buy Giver Token with USDT only!
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
                  className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] lg:w-[79px] lg:h-[79px] relative z-10"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="-ml-10 w-[130px] md:w-[150px] lg:w-[176px] h-[40px] md:h-[45px] lg:h-[47px] px-4 md:px-6 py-2 bg-green-950 text-white font-medium text-[14px] md:text-[16px] lg:text-[20px] rounded-full hover:bg-yellow-600"
                >
                  Buy Tokens
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
          Join Giver Presale Follow these steps :
        </p>
        <div className="connect">
          <p className="text-[14px] md:text-[16px] font-medium text-white">
            1) Connect Your MetaMask Wallet :
          </p>
          <button
            onClick={connectMetaMask}
            className="my-4 w-full md:w-1/4  bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold rounded px-4 py-2 ml-8"
          >
            {account ? "Wallet Connected" : "Connect MetaMask"}
          </button>
        </div>
        {account ? (
          <>
            {" "}
            <p className="text-[14px] md:text-[16px] font-medium text-white">
              2) Check Your MetaMask Account :
            </p>
            <div className="text-white ml-8 my-4">
              Your MetaMask Account : {account}
            </div>
            {purchaseHistory.length === 0 && (
              <div className="mt-2">
                <div>
                  <p className="text-[14px] md:text-[16px] font-medium text-white">
                    3) Enter USDT Amount :
                  </p>
                  <input
                    type="number"
                    placeholder="Enter USDT Amount"
                    className="w-full md:w-1/4 px-4 py-2 rounded-md border focus:outline-none focus:border-green-500 ml-8 my-4"
                    value={usdtAmount}
                    onChange={(e) => setUsdtAmount(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <p className="text-[14px] md:text-[16px] font-medium text-white my-4">
                    4) Click Buy Tokens Button :
                  </p>
                  <button
                    onClick={buyTokens}
                    className=" mt-1 w-full md:w-1/4 bg-green-900 hover:bg-green-600 transition-colors text-white font-semibold rounded px-4 py-2 ml-8"
                  >
                    Buy Tokens
                  </button>
                </div>
              </div>
            )}
            {purchaseHistory.length > 0 && (
              <div>
                <p className="text-[14px] md:text-[16px] font-medium text-white">
                  3) You Already Have Purchased Tokens Please Wait To Claim On
                  Release Date & Time :
                </p>
                <ul className="mt-4 space-y-2 ml-8">
                  {purchaseHistory.map((purchase, index) => (
                    <li key={index} className="text-white">
                      {`Amount: ${
                        purchase.tokenAmount / 1000000000000000000
                      } GIV + ${
                        (purchase.tokenAmount * 20) / 100 / 1000000000000000000
                      } Bonus, Release Date & Time : ${new Date(
                        purchase.unlockTime * 1000
                      ).toLocaleString()}`}
                      {!purchase.claimed &&
                        Math.floor(Date.now() / 1000) > purchase.unlockTime && (
                          <button
                            onClick={() =>
                              claimTokens(purchase.unlockTime, purchase.claimed)
                            }
                            className="ml-8 bg-green-900 hover:bg-green-600 transition-colors text-white font-semibold rounded px-2 py-1"
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
