import React, { useState, useEffect } from "react";
import Web3 from "web3";
import USDTABI from "../ABI/USDTABI.json"; // Make sure this is the correct ABI for the USDT token
import GIVPreSaleABI from "../ABI/GIVPreSaleABI.json"; // This should be the ABI of the contract you're interacting with
import CoinToken from "../assets/images/Coin Token.png";

const presaleContractAddress = "0x21EAA23a845BbaC45b0Ce05CA091a0A78b716753";
const usdtTokenAddress = "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd"; // The address of the USDT token contract

const WithdrawPage = () => {
  const [account, setAccount] = useState("");
  const [message, setMessage] = useState("");
  const [balance, setBalance] = useState(0);

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

      // Create the contract instance for GIVPreSale
      const contract = new web3.eth.Contract(
        GIVPreSaleABI,
        presaleContractAddress
      );

      // Check if the connected wallet is the contract owner
      const owner = await contract.methods.owner().call();
      if (account.toLowerCase() !== owner.toLowerCase()) {
        setMessage("You are not the contract owner.");
        return;
      }

      setMessage("Processing withdrawal...");

      // Call the withdrawUSDT function from the contract
      await contract.methods.withdrawUSDT().send({ from: account });

      setMessage("Withdrawal successful!");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      console.error("Error during withdrawal:", error);
    }
  };

  // Fetch contract balance (Optional)
  const fetchBalance = async () => {
    if (!account) return;

    try {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(USDTABI, usdtTokenAddress);

      // Fetch balance of USDT in the contract
      const balance = await contract.methods
        .balanceOf(presaleContractAddress)
        .call();
      setBalance(web3.utils.fromWei(balance, "ether"));
    } catch (error) {
      console.error("Error fetching balance:", error);
      setMessage("Failed to fetch balance.");
    }
  };

  // Trigger balance fetch when account changes
  useEffect(() => {
    if (account) {
      fetchBalance();
    }
  }, [account]);

  return (
    <section className="bg-[#92B344] min-h-screen p-10 flex flex-col justify-center items-center">
      <div className="text-center space-y-6">
        <h1 className="text-[36px] font-semibold text-white">Withdraw USDT</h1>
        <p className="text-[18px] text-white">
          Withdraw USDT from the GIV Pre-sale contract (only for owner)
        </p>

        <div className="space-y-4">
          <div className="text-white text-sm font-semibold">
            <p>Wallet Address: {account || "Not Connected"}</p>
            <p>USDT Balance in Contract: {balance} USDT</p>
          </div>

          <button
            onClick={withdrawUSDT}
            className="mt-4 w-full md:w-1/2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded px-4 py-2"
          >
            Withdraw USDT
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
