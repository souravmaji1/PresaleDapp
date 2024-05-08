// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract MyPresaleToken is ERC20, Ownable, Pausable {
    using SafeERC20 for IERC20;

    uint256 public constant TOKEN_DECIMALS = 10**18;
    uint256 public tokenPrice = 0.001 ether; // Initial price of one token in ETH
    uint256 public usdcTokenPrice = 1 * 10**18;
    uint256 public startTime; // Start time for the presale
    bool public saleActive = true; // Flag to track the sale state
    IERC20 public usdcToken; // USDC token contract


    uint256 public softCap;
    uint256 public hardCap;
    uint256 public totalTokensSold;
    uint256 public totalEthRaised;
    uint256 public totalUsdcRaised;

    mapping(bytes32 => address) public referralCodes;
    mapping(address => uint256) public referralRewards;
    mapping(address => bytes32) public userReferralCodes;
    mapping(address => uint256) public referralRewardsInUSDC;

    constructor(uint256 initialSupply, uint256 _startTime, address _usdcToken, uint256 _softCap, uint256 _hardCap) ERC20("MyPresaleToken", "MPST") {
    _mint(msg.sender, initialSupply);
    startTime = _startTime;
    usdcToken = IERC20(_usdcToken);
    softCap = _softCap;
    hardCap = _hardCap;
}


function buyTokensEth(uint256 _tokenAmount) public payable whenNotPaused {
    require(saleActive, "Token sale is not active");
    require(block.timestamp >= startTime, "Presale has not started yet");
    uint256 totalPrice = _tokenAmount * tokenPrice;
    uint256 Amount = _tokenAmount * TOKEN_DECIMALS;

   // Generate and store referral code
    bytes32 referralCodeHash = keccak256(abi.encodePacked(msg.sender));
    referralCodes[referralCodeHash] = msg.sender;
    userReferralCodes[msg.sender] = referralCodeHash;

    totalTokensSold += _tokenAmount;
    totalEthRaised += msg.value;
    _transfer(address(this), msg.sender, Amount);
}

function getReferralCode(address _userAddress) public view returns (bytes32) {
    return userReferralCodes[_userAddress];
}

function buyTokensWithEthAndReferral(uint256 _tokenAmount, bytes32 _referralCode) public payable whenNotPaused {
    require(saleActive, "Token sale is not active");
    require(block.timestamp >= startTime, "Presale has not started yet");
    uint256 totalPrice = _tokenAmount * tokenPrice;
    uint256 Amount = _tokenAmount * TOKEN_DECIMALS;

   // Update referral rewards
    if (_referralCode != 0x0000000000000000000000000000000000000000000000000000000000000000) {
        address referrer = referralCodes[_referralCode];
        require(referrer != address(0), "Invalid referral code");
        uint256 referrerReward = (msg.value * 5) / 100; // 5% of total ETH sent
        referralRewards[referrer] += referrerReward;
        uint256 referredReward = (msg.value * 2) / 100; // 2% of total ETH sent
        referralRewards[msg.sender] += referredReward;
    }

    totalTokensSold += _tokenAmount;
    totalEthRaised += msg.value;
    _transfer(address(this), msg.sender, Amount);
}


    function buyTokensWithUSDC(uint256 amount) public whenNotPaused {
        require(saleActive, "Token sale is not active");
        require(block.timestamp >= startTime, "Presale has not started yet");
        uint256 tokenamount = 1 * 10**18 * amount;
        uint256 tokensToTransfer = amount * usdcTokenPrice;

        // Generate and store referral code
        bytes32 referralCodeHash = keccak256(abi.encodePacked(msg.sender));
        referralCodes[referralCodeHash] = msg.sender;
        userReferralCodes[msg.sender] = referralCodeHash;

        totalTokensSold += tokenamount;
        totalUsdcRaised += tokensToTransfer;
        usdcToken.transferFrom(msg.sender, address(this), tokensToTransfer);
        _transfer(address(this), msg.sender, tokenamount);
    }

    function buyTokensWithUSDCReferal(uint256 amount, bytes32 _referralCode) public whenNotPaused {
        require(saleActive, "Token sale is not active");
        require(block.timestamp >= startTime, "Presale has not started yet");
        uint256 tokenamount = 1 * 10**18 * amount;
        uint256 tokensToTransfer = amount * usdcTokenPrice;

         // Update referral rewards
    if (_referralCode != 0x0000000000000000000000000000000000000000000000000000000000000000) {
        address referrer = referralCodes[_referralCode];
        require(referrer != address(0), "Invalid referral code");
        uint256 referrerReward = (tokensToTransfer * 5) / (100 * usdcTokenPrice); // 5% of total USDC sent
        referralRewardsInUSDC[referrer] += referrerReward;
        uint256 referredReward = (tokensToTransfer * 2) / (100 * usdcTokenPrice); // 2% of total USDC sent
        referralRewardsInUSDC[msg.sender] += referredReward;
    }

        totalTokensSold += tokenamount;
        totalUsdcRaised += tokensToTransfer;
        usdcToken.transferFrom(msg.sender, address(this), tokensToTransfer);
        _transfer(address(this), msg.sender, tokenamount);
    }
 

function withdrawReferralReward() public {
    uint256 ethReward = referralRewards[msg.sender];
    uint256 usdcReward = referralRewardsInUSDC[msg.sender];

    if (ethReward > 0) {
        referralRewards[msg.sender] = 0;
        payable(msg.sender).transfer(ethReward);
    }

    if (usdcReward > 0) {
        referralRewardsInUSDC[msg.sender] = 0;
        usdcToken.safeTransfer(msg.sender, usdcReward);
    }
}

    function airdrop(address[] calldata recipients, uint256[] calldata amounts) external onlyOwner {

    require(recipients.length == amounts.length, "Mismatched arrays");

    for(uint i = 0; i < recipients.length; i++) {
      address recipient = recipients[i];
      uint256 amount = amounts[i];
      // Transfer token
      transfer(recipient, amount); 
    }
  }

   // Getter functions
    function getTokenPriceInETH() public view returns (uint256) {
        return tokenPrice;
    }

    function getTokenPriceInUSDC() public view returns (uint256) {
        return usdcTokenPrice;
    }

    function getSaleStatus() public view returns (bool) {
        return saleActive;
    }

    function setTokenPrice(uint256 _newPrice) public onlyOwner {
        tokenPrice = _newPrice;
    }

     function setUSDCTokenPrice(uint256 _newPrice) public onlyOwner {
        usdcTokenPrice = _newPrice;
    }

    function setStartTime(uint256 _newStartTime) public onlyOwner {
        startTime = _newStartTime;
    }

    function pause() public onlyOwner {
        _pause();
        saleActive = false;
    }

    function unpause() public onlyOwner {
        _unpause();
        saleActive = true;
    }

}