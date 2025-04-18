import React, { useState, useEffect } from "react";
import Web3 from "web3";
import USDTABI from "../ABI/USDTABI.json"; // ABI for the USDT token
import GIVPreSaleABI from "../ABI/GIVPreSaleABI.json"; // ABI of the pre-sale contract
import CoinToken from "../assets/images/Coin Token.png";

const presaleContractAddress = "0xA66893715878D6fC3DA21e47168CBa61eF1b8970";
const usdtTokenAddress = "0x55d398326f99059fF775485246999027B3197955";

const WithdrawPage = () => {
  const [account, setAccount] = useState("");
  const [message, setMessage] = useState("");
  const [usdtBalance, setUSDTBalance] = useState(0);
  const [givBalance, setGIVBalance] = useState(0);

  useEffect(() => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0]);
      });
    }
  }, []);

  // Connect MetaMask wallet
  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        setMessage("MetaMask connected!");
      } catch (error) {
        setMessage("Error connecting MetaMask.");
        console.error("MetaMask connection error:", error);
      }
    } else {
      setMessage("Please install MetaMask!");
    }
  };

  // Withdraw USDT for the contract owner
  const withdrawUSDT = async () => {
    if (!account) {
      setMessage("Please connect your MetaMask wallet first.");
      return;
    }

    try {
      const web3 = new Web3(window.ethereum);

      const contract = new web3.eth.Contract(
        GIVPreSaleABI,
        presaleContractAddress
      );

      const owner = await contract.methods.owner().call();
      if (account.toLowerCase() !== owner.toLowerCase()) {
        setMessage("You are not the contract owner.");
        return;
      }

      setMessage("Processing USDT withdrawal...");

      await contract.methods.withdrawUSDT().send({ from: account });

      setMessage("USDT withdrawal successful!");
      fetchBalances(); // Refresh balances
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      console.error("Error during USDT withdrawal:", error);
    }
  };

  // Withdraw GIV for the contract owner
  const withdrawGIV = async () => {
    if (!account) {
      setMessage("Please connect your MetaMask wallet first.");
      return;
    }

    try {
      const web3 = new Web3(window.ethereum);

      const contract = new web3.eth.Contract(
        GIVPreSaleABI,
        presaleContractAddress
      );

      const owner = await contract.methods.owner().call();
      if (account.toLowerCase() !== owner.toLowerCase()) {
        setMessage("You are not the contract owner.");
        return;
      }

      setMessage("Processing GIV withdrawal...");

      await contract.methods
        .withdrawGIV(web3.utils.toWei("100", "ether"))
        .send({
          from: account,
        });

      setMessage("GIV withdrawal successful!");
      fetchBalances(); // Refresh balances
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      console.error("Error during GIV withdrawal:", error);
    }
  };

  // Fetch contract balances
  const fetchBalances = async () => {
    if (!account) return;

    try {
      const web3 = new Web3(window.ethereum);
      const usdtContract = new web3.eth.Contract(USDTABI, usdtTokenAddress);
      const givContract = new web3.eth.Contract(
        GIVPreSaleABI,
        presaleContractAddress
      );

      // Fetch USDT balance
      const usdtBalance = await usdtContract.methods
        .balanceOf(presaleContractAddress)
        .call();
      setUSDTBalance(web3.utils.fromWei(usdtBalance, "ether"));

      // Fetch GIV balance
      const givBalance = await givContract.methods.givToken().call();
      const givContractBalance = await usdtContract.methods
        .balanceOf(givBalance)
        .call();
      setGIVBalance(web3.utils.fromWei(givContractBalance, "ether"));
    } catch (error) {
      console.error("Error fetching balances:", error);
      setMessage("Failed to fetch balances.");
    }
  };

  useEffect(() => {
    if (account) {
      fetchBalances();
    }
  }, [account]);

  return (
    <section className="bg-[#92B344] min-h-screen p-10 flex flex-col justify-center items-center">
      <div className="text-center space-y-6">
        <h1 className="text-[36px] font-semibold text-white">
          Withdraw Tokens
        </h1>
        <p className="text-[18px] text-white">
          Withdraw USDT or GIV from the GIV Pre-sale contract (only for owner)
        </p>

        <div className="space-y-4">
          <div className="text-white text-sm font-semibold">
            <p>Wallet Address: {account || "Not Connected"}</p>
            <p>USDT Balance in Contract: {usdtBalance} USDT</p>
            <p>GIV Balance in Contract: {givBalance} GIV</p>
          </div>

          <button
            onClick={withdrawUSDT}
            className="mt-4 w-full md:w-1/2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded px-4 py-2"
          >
            Withdraw USDT
          </button>

          <button
            onClick={withdrawGIV}
            className="mt-4 w-full md:w-1/2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded px-4 py-2"
          >
            Withdraw GIV
          </button>

          <button
            onClick={connectMetaMask}
            className="mt-4 w-full md:w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded px-4 py-2"
          >
            {account ? "Wallet Connected" : "Connect MetaMask"}
          </button>

          {message && (
            <p className="text-white text-sm mt-2 text-center">{message}</p>
          )}
        </div>
      </div>

      <div className="relative w-full flex justify-center items-center">
        <img src={CoinToken} alt="Coin" className="w-40 h-40 object-contain" />
      </div>
    </section>
  );
};

export default WithdrawPage;
