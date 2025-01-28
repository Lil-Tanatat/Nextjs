import { Fragment } from "react";

const Airdrop = () => {
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
                type="button"
                className="btn bg-[#000] rounded-full text-white hover:bg-[#92B344] hover:text-mls-black text-xs lg:text-base border-none shadow-none flex items-center justify-between px-10 py-2"
              >
                <span>CONNECT WALLET</span>
              </button>
            </div>
          </div>

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
                    className="btn bg-[#92B344] rounded-full text-black hover:opacity-80 hover:text-mls-black text-xs lg:text-base py-2 border-none shadow-none w-full lg:w-full"
                  >
                    Join
                  </button>
                  <button
                    type="button"
                    className="btn bg-yellow-500 rounded-full text-black hover:opacity-80 hover:text-mls-black text-xs lg:text-base py-2 border-none shadow-none w-full lg:w-full"
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
                    className="btn bg-[#92B344] rounded-full text-black hover:opacity-80 hover:text-mls-black text-xs lg:text-base py-2 border-none shadow-none w-full lg:w-full"
                  >
                    Join
                  </button>
                  <button
                    type="button"
                    className="btn bg-yellow-500 rounded-full text-black hover:opacity-80 hover:text-mls-black text-xs lg:text-base py-2 border-none shadow-none w-full lg:w-full"
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
