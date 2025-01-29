// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract Airdrop {
    address public owner;
    IERC20 public givToken;
    uint256 public airdropAmount = 100 * 1e18; // 100 GIV tokens (18 decimals)
    mapping(address => bool) public hasClaimedX;
    mapping(address => bool) public hasClaimedFacebook;
    bool private locked;

    event AirdropClaimed(
        address indexed claimant,
        uint256 amount,
        string platform
    );

    constructor(address _givToken) {
        owner = msg.sender;
        givToken = IERC20(_givToken);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    modifier noReentrancy() {
        require(!locked, "No reentrancy");
        locked = true;
        _;
        locked = false;
    }

    function claimAirdropX() external noReentrancy {
        require(!hasClaimedX[msg.sender], "Airdrop already claimed for X");
        require(
            givToken.balanceOf(address(this)) >= airdropAmount,
            "Insufficient airdrop balance"
        );

        hasClaimedX[msg.sender] = true;
        require(
            givToken.transfer(msg.sender, airdropAmount),
            "Token transfer failed"
        );

        emit AirdropClaimed(msg.sender, airdropAmount, "X");
    }

    function claimAirdropFacebook() external noReentrancy {
        require(
            !hasClaimedFacebook[msg.sender],
            "Airdrop already claimed for Facebook"
        );
        require(
            givToken.balanceOf(address(this)) >= airdropAmount,
            "Insufficient airdrop balance"
        );

        hasClaimedFacebook[msg.sender] = true;
        require(
            givToken.transfer(msg.sender, airdropAmount),
            "Token transfer failed"
        );

        emit AirdropClaimed(msg.sender, airdropAmount, "Facebook");
    }

    function withdrawTokens(uint256 amount) external onlyOwner noReentrancy {
        require(
            givToken.balanceOf(address(this)) >= amount,
            "Insufficient balance"
        );
        require(givToken.transfer(owner, amount), "Token withdrawal failed");
    }
}
