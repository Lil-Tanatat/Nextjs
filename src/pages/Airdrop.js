import { Fragment, useState, useEffect } from "react";
import Web3 from "web3";
import FetchBalance from "../ABI/FetchBalance.json";
import AirdropABI from "../ABI/AirdropABI.json";

const Airdrop = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [tokenBalance, setTokenBalance] = useState(0);
  const [hasClaimedX, setHasClaimedX] = useState(false);
  const [hasClaimedFacebook, setHasClaimedFacebook] = useState(false);

  const tokenAddress = "0x98824D0e3f0831bFd19576be9B3531B21d0E862d";
  const airdropAddress = "0xDd988BEc34f0550e4EAe0c7231F0F687874D9765";
  const tokenABI = FetchBalance;
  const airdropABI = AirdropABI;

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        setWalletAddress(accounts[0]);
        setIsWalletConnected(true);

        const contract = new web3.eth.Contract(tokenABI, tokenAddress);
        const balance = await contract.methods.balanceOf(accounts[0]).call();
        setTokenBalance(
          parseFloat(web3.utils.fromWei(balance, "ether")).toFixed(2)
        );
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert("Please install MetaMask to connect your wallet.");
    }
  };

  const handleJoinX = () => {
    window.open("https://x.com/giver_token", "_blank");
    setHasClaimedX(true);
  };

  const handleJoinFacebook = () => {
    window.open("https://facebook.com/profile.php?id=61567122001523", "_blank");
    setHasClaimedFacebook(true);
  };

  const handleClaimX = async () => {
    if (!hasClaimedX) {
      alert("You need to join X first!");
      return;
    }

    const web3 = new Web3(window.ethereum);
    const airdropContract = new web3.eth.Contract(airdropABI, airdropAddress);

    try {
      await airdropContract.methods
        .claimAirdropX()
        .send({ from: walletAddress });
      // alert("Airdrop claimed successfully!");
      setHasClaimedX(false);
    } catch (error) {
      console.error("Error claiming airdrop:", error);
    }
  };

  const handleClaimFacebook = async () => {
    if (!hasClaimedFacebook) {
      alert("You need to join Facebook first!");
      return;
    }

    const web3 = new Web3(window.ethereum);
    const airdropContract = new web3.eth.Contract(airdropABI, airdropAddress);

    try {
      await airdropContract.methods
        .claimAirdropFacebook()
        .send({ from: walletAddress });
      // alert("Airdrop claimed successfully!");
      setHasClaimedFacebook(false);
    } catch (error) {
      console.error("Error claiming airdrop:", error);
    }
  };

  useEffect(() => {
    if (walletAddress) {
      const fetchTokenBalance = async () => {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(tokenABI, tokenAddress);
        const balance = await contract.methods.balanceOf(walletAddress).call();
        setTokenBalance(
          parseFloat(web3.utils.fromWei(balance, "ether")).toFixed(2)
        );
      };
      fetchTokenBalance();
    }
  }, [walletAddress]);

  return (
    <Fragment>
      <div className="grid grid-cols-12 lg:gap-x-10">
        <div className="col-span-12 lg:col-span-12 px-0 mt-1">
          <div className="relative w-full h-80 mb-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/assets/image/airdrop-background.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(2px)",
                zIndex: 0,
              }}
            ></div>
            <div className="relative z-10 grid place-items-center h-full">
              <button
                onClick={connectWallet}
                type="button"
                disabled={isWalletConnected}
                className={`btn bg-[#000] rounded-full text-white hover:bg-[#92B344] hover:text-mls-black text-xs lg:text-base border-none shadow-none flex items-center justify-between px-10 py-2 ${
                  isWalletConnected ? "bg-gray-500 cursor-not-allowed" : ""
                }`}
              >
                <span>
                  {isWalletConnected ? "WALLET CONNECTED" : "CONNECT WALLET"}
                </span>
              </button>
            </div>
          </div>
          {/* <div className="text-center text-black mb-5">
            {isWalletConnected && (
              <div>
                <p>Wallet Address: {walletAddress}</p>
                <p>Token Balance: {tokenBalance} GIV</p>
              </div>
            )}
          </div> */}

          <div className="grid grid-cols-12 gap-4 mb-5 px-10">
            <div className="col-span-12 lg:col-span-6">
              <div className="grid grid-cols-12 gap-0">
                <div className="col-span-8">
                  <div className="bg-white rounded-xl p-4 h-full">
                    <div className="flex flex-row items-center justify-start">
                      <div className="h-20 w-20 mr-10">
                        <img alt="x" src="/assets/image/icon/x-logo.png" />
                      </div>
                      <div>
                        <div className="text-black font-bold text-xl lg:text-xl mb-2">
                          Follow Giver X
                        </div>
                        <div className="text-black font-bold text-xs lg:text-xs">
                          +100 GIV
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-4 flex flex-col items-start space-y-3 ml-5">
                  <button
                    type="button"
                    onClick={handleJoinX}
                    disabled={!isWalletConnected}
                    className={`btn ${
                      isWalletConnected
                        ? "bg-[#92B344]"
                        : "bg-gray-500 cursor-not-allowed"
                    } rounded-full text-black hover:opacity-80 hover:text-mls-black text-xs lg:text-base py-2 border-none shadow-none w-full lg:w-full`}
                  >
                    Join
                  </button>
                  <button
                    type="button"
                    onClick={handleClaimX}
                    disabled={!isWalletConnected || !hasClaimedX}
                    className={`btn ${
                      isWalletConnected && hasClaimedX
                        ? "bg-yellow-500"
                        : "bg-gray-500 cursor-not-allowed"
                    } rounded-full text-black hover:opacity-80 hover:text-mls-black text-xs lg:text-base py-2 border-none shadow-none w-full lg:w-full`}
                  >
                    Claim
                  </button>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <div className="grid grid-cols-12 gap-0">
                <div className="col-span-8">
                  <div className="bg-white rounded-xl p-4 h-full">
                    <div className="flex flex-row items-center justify-start">
                      <div className="h-20 w-20 mr-10">
                        <img
                          alt="x"
                          src="/assets/image/icon/facebook-logo.png"
                        />
                      </div>
                      <div>
                        <div className="text-black font-bold text-xl lg:text-xl mb-2">
                          Follow Giver Facebook
                        </div>
                        <div className="text-black font-bold text-xs lg:text-xs">
                          +100 GIV
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-4 flex flex-col items-start space-y-3 ml-5">
                  <button
                    type="button"
                    onClick={handleJoinFacebook}
                    disabled={!isWalletConnected}
                    className={`btn ${
                      isWalletConnected
                        ? "bg-[#92B344]"
                        : "bg-gray-500 cursor-not-allowed"
                    } rounded-full text-black hover:opacity-80 hover:text-mls-black text-xs lg:text-base py-2 border-none shadow-none w-full lg:w-full`}
                  >
                    Join
                  </button>
                  <button
                    type="button"
                    onClick={handleClaimFacebook}
                    disabled={!isWalletConnected || !hasClaimedFacebook}
                    className={`btn ${
                      isWalletConnected && hasClaimedFacebook
                        ? "bg-yellow-500"
                        : "bg-gray-500 cursor-not-allowed"
                    } rounded-full text-black hover:opacity-80 hover:text-mls-black text-xs lg:text-base py-2 border-none shadow-none w-full lg:w-full`}
                  >
                    Claim
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Airdrop;
