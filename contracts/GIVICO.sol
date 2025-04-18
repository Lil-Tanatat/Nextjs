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

contract GIVICO {
    address public owner;
    IERC20 public givToken;
    IERC20 public usdtToken;
    uint256 public pricePerToken = 1e16; // 0.01 USDT per GIV (18 decimals)
    uint256 public lockTime = 1 seconds; // 1 second
    uint256 public bonusPercentage = 0; // 0% bonus
    uint256 public recommenderBonusPercentage = 3; // 3% bonus for recommender

    struct Purchase {
        uint256 amount;
        uint256 unlockTime;
        bool claimed; // New field to check if tokens have been claimed
    }

    mapping(address => Purchase) public purchases;
    address[] public buyers; // New array to track all buyers

    event TokensPurchased(address buyer, uint256 amount, uint256 unlockTime);
    event TokensReleased(address buyer, uint256 amountWithBonus);
    event TokensWithdrawn(address token, uint256 amount);
    event RecommenderBonusTransferred(address recommender, uint256 bonusAmount); // New event for logging
    event Debug(string message); // New event for debugging

    constructor(address _givToken, address _usdtToken) {
        owner = msg.sender;
        givToken = IERC20(_givToken);
        usdtToken = IERC20(_usdtToken);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    function buyTokens(uint256 usdtAmount, address recommender) external {
        require(usdtAmount > 0, "Must send USDT to buy GIV tokens");

        uint256 tokenAmount = (usdtAmount * 1e18) / pricePerToken;

        // Transfer USDT from buyer to contract
        try
            usdtToken.transferFrom(msg.sender, address(this), usdtAmount)
        returns (bool success) {
            require(success, "USDT transfer failed");
            emit Debug("USDT transfer successful");
        } catch Error(string memory reason) {
            emit Debug(reason);
            revert(reason);
        } catch {
            emit Debug("USDT transfer failed without reason");
            revert("USDT transfer failed without reason");
        }

        // Lock tokens for lockTime
        purchases[msg.sender] = Purchase({
            amount: tokenAmount,
            unlockTime: block.timestamp + lockTime,
            claimed: false
        });

        // Add buyer to the array if not already present
        if (buyers.length == 0 || buyers[buyers.length - 1] != msg.sender) {
            buyers.push(msg.sender);
        }

        // If recommender is provided, transfer bonus tokens
        if (recommender != address(0)) {
            uint256 bonusAmount = (tokenAmount * recommenderBonusPercentage) /
                100;
            try givToken.transfer(recommender, bonusAmount) returns (
                bool success
            ) {
                require(success, "GIV token transfer to recommender failed");
                emit RecommenderBonusTransferred(recommender, bonusAmount); // Log the bonus transfer
            } catch Error(string memory reason) {
                emit Debug(reason);
                revert(reason);
            } catch {
                emit Debug(
                    "GIV token transfer to recommender failed without reason"
                );
                revert(
                    "GIV token transfer to recommender failed without reason"
                );
            }
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

    function withdrawUSDT() external onlyOwner {
        uint256 balance = usdtToken.balanceOf(address(this));
        require(balance > 0, "No USDT to withdraw");
        require(usdtToken.transfer(owner, balance), "USDT withdrawal failed");

        emit TokensWithdrawn(address(usdtToken), balance); // Emit event
    }

    // Withdraw all GIV tokens (specific to GIV)
    function withdrawGIV() external onlyOwner {
        uint256 balance = givToken.balanceOf(address(this));
        require(balance > 0, "No GIV tokens to withdraw");
        require(givToken.transfer(owner, balance), "GIV withdrawal failed");

        emit TokensWithdrawn(address(givToken), balance);
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
}
