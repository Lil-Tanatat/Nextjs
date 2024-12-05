// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);

    function balanceOf(address account) external view returns (uint256);
}

contract GIVPreSale {
    address public owner;
    IERC20 public givToken;
    IERC20 public usdtToken;
    uint256 public pricePerToken = 1e16; // 0.01 USDT per GIV (18 decimals)
    uint256 public lockTime = 2 * 365 days; // 2 years
    uint256 public bonusPercentage = 20; // 20% bonus

    struct Purchase {
        uint256 amount;
        uint256 unlockTime;
        bool claimed; // New field to check if tokens have been claimed
    }

    mapping(address => Purchase) public purchases;
    address[] public buyers; // New array to track all buyers

    event TokensPurchased(address buyer, uint256 amount, uint256 unlockTime);
    event TokensReleased(address buyer, uint256 amountWithBonus);

    constructor(address _givToken, address _usdtToken) {
        owner = msg.sender;
        givToken = IERC20(_givToken);
        usdtToken = IERC20(_usdtToken);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    function buyTokens(uint256 usdtAmount) external {
        require(usdtAmount > 0, "Must send USDT to buy GIV tokens");

        uint256 tokenAmount = (usdtAmount * 1e18) / pricePerToken;

        // Transfer USDT from buyer to contract
        require(
            usdtToken.transferFrom(msg.sender, address(this), usdtAmount),
            "USDT transfer failed"
        );

        // Lock tokens for 2 years
        purchases[msg.sender] = Purchase({
            amount: tokenAmount,
            unlockTime: block.timestamp + lockTime,
            claimed: false // Set claimed status to false
        });

        // Add buyer to the array if they are not already present
        if (buyers.length == 0 || buyers[buyers.length - 1] != msg.sender) {
            buyers.push(msg.sender);
        }

        emit TokensPurchased(
            msg.sender,
            tokenAmount,
            block.timestamp + lockTime
        );
    }

    function releaseTokens(address buyer) external {
        Purchase storage purchase = purchases[buyer];
        require(purchase.amount > 0, "No tokens to release");
        require(
            block.timestamp >= purchase.unlockTime,
            "Tokens are still locked"
        );
        require(!purchase.claimed, "Tokens have already been claimed");

        uint256 amountWithBonus = purchase.amount +
            (purchase.amount * bonusPercentage) /
            100;

        // Transfer GIV tokens to buyer
        require(
            givToken.transfer(buyer, amountWithBonus),
            "GIV token transfer failed"
        );

        // Reset the purchase record
        purchase.amount = 0;
        purchase.claimed = true;

        emit TokensReleased(buyer, amountWithBonus);
    }

    function getPurchaseDetails(
        address buyer
    ) external view returns (uint256 amount, uint256 unlockTime, bool claimed) {
        Purchase storage purchase = purchases[buyer];
        return (purchase.amount, purchase.unlockTime, purchase.claimed);
    }

    function getAllBuyers() external view returns (address[] memory) {
        return buyers;
    }

    // Withdraw USDT (for owner)
    function withdrawUSDT() external onlyOwner {
        uint256 balance = usdtToken.balanceOf(address(this));
        require(usdtToken.transfer(owner, balance), "USDT withdrawal failed");
    }
}
