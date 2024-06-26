import { ethers } from "ethers";

// BNB Smart Chain RPC URL
const rpcUrl = "https://bsc-dataseed1.binance.org/";

// Chainlink USDT/BNB Price Feed contract address
const priceFeedAddress = "0xD5c40f5144848Bd4EF08a9605d860e727b991513";

// AggregatorV3Interface ABI
const aggregatorV3InterfaceABI = [
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "description",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }],
    "name": "getRoundData",
    "outputs": [
      { "internalType": "uint80", "name": "roundId", "type": "uint80" },
      { "internalType": "int256", "name": "answer", "type": "int256" },
      { "internalType": "uint256", "name": "startedAt", "type": "uint256" },
      { "internalType": "uint256", "name": "updatedAt", "type": "uint256" },
      { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "latestRoundData",
    "outputs": [
      { "internalType": "uint80", "name": "roundId", "type": "uint80" },
      { "internalType": "int256", "name": "answer", "type": "int256" },
      { "internalType": "uint256", "name": "startedAt", "type": "uint256" },
      { "internalType": "uint256", "name": "updatedAt", "type": "uint256" },
      { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "version",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
];


const SCALING_FACTOR = 1e18; // 10^18

async function getUSDTBNBPrice() {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const priceFeed = new ethers.Contract(priceFeedAddress, aggregatorV3InterfaceABI, provider);
  const roundData = await priceFeed.latestRoundData();
  const scaledPrice = roundData.answer;
  const price = scaledPrice / SCALING_FACTOR;
  console.log(`Latest USDT/BNB price: ${price}`);
}






getUSDTBNBPrice();