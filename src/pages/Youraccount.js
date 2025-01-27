import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import YourAccountImage from "../assets/images/your-account.png";

const YourAccount = () => {
  // Placeholder data for previewing prototype UX/
  const navigate = useNavigate();
  const tokenBalance = 1000;
  const onBuyToken = () => {
    navigate("/ico");
  };
  const referralLink = "https://example.com/referral";
  const onCopyReferralLink = () => {};

  return (
    <Fragment>
      {/* Placeholder components for previewing prototype UX/UI */}
      <div className="container p-20">
        <div className="grid grid-cols-12 lg:gap-x-10 bg-white justify-center items-center border border-gray-200 p-10 rounded-2xl">
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
            <h1 className="text-3xl lg:text-5xl text-black mb-3 text-center lg:text-start mt-5">
              Welcome <span className="text-mls-primary">Hoppers</span>,
            </h1>
            <h2 className="text-xl lg:text-xl text-black mb-3 text-center lg:text-start">
              Community-based | Gamification | Ecosystem
            </h2>

            <div className="grid grid-cols-12 gap-4 mb-5">
              <div className="col-span-12 lg:col-span-8">
                <div className="bg-mls-secondary-black border-mls-secondary-gray border-2 rounded-xl p-4 h-full">
                  <div className="flex flex-row items-center justify-between">
                    <div>
                      <div className="text-black font-medium text-sm lg:text-base mb-2">
                        Token Balance
                        <div className="inline">
                          <span className="text-black inline cursor-pointer ml-2">
                            👁️
                          </span>
                        </div>
                      </div>
                      <div className="text-yellow-400 text-lg lg:text-3xl">
                        {tokenBalance.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}{" "}
                        HOPS
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
                    className="btn bg-[#92B344] rounded-3xl text-black hover:bg-mls-primary hover:text-mls-black text-xs lg:text-base px-6 py-3  border-none shadow-none w-32 lg:w-36"
                  >
                    Buy GIV
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
                  Referral Link
                </label>
                <div className="flex flex-row">
                  <div className="relative text-white-dark">
                    <input
                      disabled
                      id="Email"
                      type="text"
                      placeholder={referralLink}
                      className="refferal-link ps-2 h-full w-96 bg-gray-300 placeholder:text-black rounded-lg"
                      autoComplete="off"
                      name="email"
                    />
                  </div>
                  <button
                    onClick={onCopyReferralLink}
                    type="button"
                    className="btn ml-2 bg-mls-primary rounded-3xl text-mls-black text-xs lg:text-base px-4 py-2 hover:opacity-80 border-none shadow-none w-32 lg:w-36"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className="col-span-12 lg:col-span-6 mt-2 lg:mt-4">
                <div className="flex flex-row items-center justify-between mb-2 max-w-full w-full">
                  <div className="text-lg lg:text-xl text-black font-medium">
                    News
                  </div>
                  <Link to="/news">
                    <button className="btn text-mls-primary px-4 max-h-max h-7 flex items-center justify-center rounded-lg hover:bg-mls-light-gray border-none shadow-none">
                      See More
                    </button>
                  </Link>
                </div>

                <div>MLSListCard Component</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default YourAccount;
