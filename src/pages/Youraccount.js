import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import YourAccountImage from "../assets/images/your-account.png";
import Web3 from "web3";
import FetchBalance from "../ABI/FetchBalance.json";
import { useTranslation } from "react-i18next";

const YourAccount = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [tokenBalance, setTokenBalance] = useState(0);
  const [walletAddress, setWalletAddress] = useState("");
  const [referralLink, setReferralLink] = useState("");
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isCopyButtonDisabled, setIsCopyButtonDisabled] = useState(false);
  const [copyButtonText, setCopyButtonText] = useState(t("copy"));

  const tokenAddress = "0x98824D0e3f0831bFd19576be9B3531B21d0E862d";
  const tokenABI = FetchBalance;

  const onBuyToken = () => {
    navigate("/ico");
  };

  const onCopyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopyButtonText(t("copied"));
    setIsCopyButtonDisabled(true);
    setTimeout(() => {
      setCopyButtonText(t("copy"));
      setIsCopyButtonDisabled(false);
    }, 3000);
  };

  const formatBalance = (balance) => {
    return parseFloat(balance).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        setWalletAddress(accounts[0]);
        setReferralLink(`https://givertokens.com/ico/${accounts[0]}`);
        setIsWalletConnected(true);

        const contract = new web3.eth.Contract(tokenABI, tokenAddress);
        const balance = await contract.methods.balanceOf(accounts[0]).call();
        setTokenBalance(formatBalance(web3.utils.fromWei(balance, "ether")));
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert(t("installMetaMask"));
    }
  };

  useEffect(() => {
    if (walletAddress) {
      setReferralLink(`https://givertokens.com/ico/${walletAddress}`);
      const fetchTokenBalance = async () => {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(tokenABI, tokenAddress);
        const balance = await contract.methods.balanceOf(walletAddress).call();
        setTokenBalance(formatBalance(web3.utils.fromWei(balance, "ether")));
      };
      fetchTokenBalance();
    }
  }, [walletAddress]);

  return (
    <Fragment>
      {/* Placeholder components for previewing prototype UX/UI */}
      <div className="container py-5 px-4 lg:px-32">
        <div className="grid grid-cols-12 gap-4 lg:gap-x-10 bg-white justify-center items-center border border-gray-200 p-5 lg:p-10 rounded-2xl">
          <div className="hidden lg:block col-span-12 lg:col-span-4">
            <div className="rounded-xl overflow-hidden max-w-full h-full">
              <img
                src={YourAccountImage}
                className="w-full max-w-full h-full object-cover"
                alt="itemImage"
              />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <h1 className="text-xl lg:text-3xl font-bold text-green-800 mb-3 text-center lg:text-start mt-5">
              {t("welcomeToGiverReferralProgram")}
            </h1>
            <h2 className="text-md lg:text-xl text-black text-center lg:text-start">
              {t("sendReferralLink")}
            </h2>

            <button
              onClick={connectWallet}
              type="button"
              disabled={isWalletConnected}
              className={`py-3 btn my-5 font-bold text-white rounded-3xl text-xs lg:text-base px-6 border-none shadow-none w-full lg:w-56 ${
                isWalletConnected
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-[#92B344] hover:bg-mls-primary hover:text-mls-black"
              }`}
            >
              {isWalletConnected ? t("walletConnected") : t("connectWallet")}
            </button>

            <div className="grid grid-cols-12 gap-4 mb-5">
              <div className="col-span-12">
                <div className="bg-mls-secondary-black border-gray-200 border-2 rounded-xl p-4 w-full h-full">
                  <div className="flex flex-row items-center justify-between">
                    <div>
                      <div className="text-black font-medium text-sm lg:text-base mb-2">
                        {t("tokenBalance")}
                        <div className="inline">
                          <span className="text-black inline cursor-pointer ml-2">
                            👁️
                          </span>
                        </div>
                      </div>
                      <div className="text-yellow-400 text-lg lg:text-3xl">
                        {tokenBalance} GIV
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-8">
                <div className="flex flex-row justify-between">
                  <button
                    onClick={onBuyToken}
                    type="button"
                    disabled={!isWalletConnected}
                    className={`btn rounded-3xl text-white text-xs lg:text-base px-6 py-3 border-none shadow-none w-full lg:w-40 ${
                      isWalletConnected
                        ? "bg-[#92B344] hover:bg-mls-primary hover:text-mls-black"
                        : "bg-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {t("buyGiv")}
                  </button>
                </div>
              </div>
            </div>
            <div className="referral-section mb-2">
              <div>
                <label
                  htmlFor="Email"
                  className="text-black text-lg font-light"
                >
                  {t("referralLink")}
                </label>
                <div className="flex flex-col lg:flex-row">
                  <div className="relative text-white-dark w-full lg:w-auto">
                    <input
                      disabled
                      id="Email"
                      type="text"
                      value={referralLink}
                      className="refferal-link ps-2 h-10 lg:h-full w-full lg:w-96 bg-gray-300 placeholder:text-black rounded-lg"
                      autoComplete="off"
                      name="email"
                    />
                  </div>
                  <button
                    onClick={onCopyReferralLink}
                    type="button"
                    disabled={!isWalletConnected || isCopyButtonDisabled}
                    className={`btn mt-2 lg:mt-0 lg:ml-2 rounded-3xl text-xs lg:text-base px-4 py-2 border-none shadow-none w-full lg:w-36 ${
                      isCopyButtonDisabled || !isWalletConnected
                        ? "bg-gray-500 text-white cursor-not-allowed"
                        : "bg-blue-500 text-white hover:opacity-80"
                    }`}
                  >
                    {copyButtonText}
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className="col-span-12 lg:col-span-6 mt-2 lg:mt-4">
                <div className="flex flex-row items-center justify-between mb-2 max-w-full w-full">
                  <div className="text-lg lg:text-xl text-black font-medium">
                    {t("news")}
                  </div>
                  <Link to="/blog">
                    <button
                      disabled={!isWalletConnected}
                      className={`btn text-mls-primary px-4 max-h-max h-7 flex items-center justify-center rounded-lg hover:bg-mls-light-gray border-none shadow-none ${
                        !isWalletConnected
                          ? "bg-gray-500 text-white cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {t("seeMore")}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default YourAccount;
