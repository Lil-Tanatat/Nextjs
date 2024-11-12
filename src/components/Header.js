import React, { useEffect, useState } from "react";
import Web3 from "web3";
import GIVPreSaleABI from "../ABI/GIVPreSaleABI.json";
import USDTABI from "../ABI/USDTABI.json";
import CoinToken from "../assets/images/Coin Token.png";

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
    const startDate = new Date();
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

  // Buy Tokens
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
      if (parseFloat(usdtBalance) < usdtValue) {
        setMessage("Insufficient USDT balance.");
        return;
      }

      const allowance = await usdtContract.methods
        .allowance(account, presaleContractAddress)
        .call();

      if (parseFloat(allowance) < usdtValue) {
        setMessage("Approving USDT for the presale contract...");
        await usdtContract.methods
          .approve(presaleContractAddress, usdtAmount)
          .send({ from: account });
        setMessage("USDT approved successfully.");
      }

      setMessage("Processing your transaction...");
      await presaleContract.methods
        .buyTokens(usdtValue.toString())
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

          <div className="mt-4">
            <input
              type="number"
              placeholder="Enter USDT Amount"
              className="w-full md:w-1/2 px-4 py-2 rounded-md border focus:outline-none focus:border-green-500"
              value={usdtAmount}
              onChange={(e) => setUsdtAmount(e.target.value)}
            />
            <button
              onClick={buyTokens}
              className="mt-2 w-full md:w-1/2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded px-4 py-2"
            >
              Buy Tokens
            </button>
          </div>

          <button
            onClick={connectMetaMask}
            className="mt-2 w-full md:w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded px-4 py-2"
          >
            {account ? "Wallet Connected" : "Connect MetaMask"}
          </button>

          {message && (
            <p className="text-white text-sm mt-2 text-center">{message}</p>
          )}

          <h2 className="mt-8 text-white font-semibold">Purchase History</h2>
          {purchaseHistory.length > 0 ? (
            <ul className="mt-2 space-y-2">
              {purchaseHistory.map((purchase, index) => (
                <li key={index} className="text-white text-sm">
                  {`Amount: ${purchase.tokenAmount}, Unlock Time: ${new Date(
                    purchase.unlockTime * 1000
                  ).toLocaleString()}, Claimed: ${
                    purchase.claimed ? "Yes" : "No"
                  }`}
                  {!purchase.claimed &&
                    Math.floor(Date.now() / 1000) > purchase.unlockTime && (
                      <button
                        onClick={() =>
                          claimTokens(purchase.unlockTime, purchase.claimed)
                        }
                        className="ml-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded px-2 py-1"
                      >
                        Claim
                      </button>
                    )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-white text-sm mt-2">
              No purchase history available.
            </p>
          )}
        </div>
      </div>

      <div className="relative w-full md:w-1/2 flex justify-center items-center">
        <img
          src={CoinToken}
          alt="Coin"
          className="w-100 h-100 md:w-100 md:h-100 object-contain"
        />
      </div>
    </section>
  );
};

export default Header;
