import { curve, heroBackground, robot } from "../assets";
import Button from "./Button";
import Section from "./Section";
import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";
import { heroIcons } from "../constants";
import { ScrollParallax } from "react-just-parallax";
import { useRef } from "react";
import Generating from "./Generating";
import Notification from "./Notification";
import CompanyLogos from "./CompanyLogos";
import { ethers } from 'ethers';
import { useState } from "react";
import { keccak256 } from 'js-sha3';

//import {  getContract, prepareContractCall, sendTransaction, resolveMethod} from "thirdweb";
//import { useActiveAccount } from "thirdweb/react";
//import { useSendTransaction } from "thirdweb/react";
//import { chain } from "../chain";
//import { client } from "../client";
import abi from './abi.json';
import { maincontract,usdtcontract } from "../constants/constants";
//import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";

const Hero = () => {
  const parallaxRef = useRef(null);

  const [status, setStatus] = useState('');
    const [provider, setProvider] = useState(null);
    const [account, setAccount] = useState('');
    const [amount, setAmount] = useState("");
    const [usdcamount, setUsdcAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("ethreferal");
    const [loading, setLoading] = useState(false);
    const [ethreferalcode,setEthReferal] = useState("");
    const [usdcreferalcode, setUsdcReferal] = useState("");
    const [userreferalcode,setUserReferalCode] = useState("");

    const [ walletaddress, setWalletaddress] = useState("");

  //  const account = useActiveAccount();

   // const { mutate: sendTransaction, isError } = useSendTransaction();

   const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        handleAccountsChanged(accounts);
        window.ethereum.on('accountsChanged', handleAccountsChanged);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };
  
  
  
  const disconnectWallet = () => {
    setAccount('');
    setStatus('Not Connected');
  };
  
  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      console.log('Please connect to MetaMask.');
      disconnectWallet();
    } else {
      setAccount(accounts[0]);
      setStatus('Connected');
    }
  };

    
  

    const FetchReferalcode = async () => {
      try {

        // Deploy the compiled contract using MetaMask
        const provider = new ethers.providers.JsonRpcProvider("https://opt-sepolia.g.alchemy.com/v2/2Z8nGJ_Xw4fdJJfv33GORr5Cdjzmm-41");
    
    
        const contractaddress = "0x5Af23C7c84765eF5bC86fED70fb6c08c862759D9";
        const abi = [
          {
            "type": "function",
            "name": "getReferralCode",
            "inputs": [
              {
                "type": "address",
                "name": "_userAddress",
                "internalType": "address"
              }
            ],
            "outputs": [
              {
                "type": "bytes32",
                "name": "",
                "internalType": "bytes32"
              }
            ],
            "stateMutability": "view"
          }
        ];
    
        // Create a contract factory using the ABI and bytecode
        const contract = new ethers.Contract(contractaddress, abi, provider);
    
        
        const call = await contract.getReferralCode(account);

        setUserReferalCode(call);
        
        console.log(call);
      } catch (error) {
        console.error(error);
      } 
    };

    const GenerateReferalCode = async () => {
      try {
        setLoading(true);

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const abi = [
          {
            "type": "function",
            "name": "setReferralCode",
            "inputs": [
              {
                "type": "bytes32",
                "name": "_referralCode",
                "internalType": "bytes32"
              }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
          }
        ]
    
    
        const contractaddress = "0x5Af23C7c84765eF5bC86fED70fb6c08c862759D9";

        const contract = new ethers.Contract(contractaddress, abi, signer);
        
    
        const referralCodeHash = '0x' + keccak256(account.address);

        console.log(referralCodeHash);


       const call = await contract.setReferralCode(referralCodeHash);

     // const transaction = await prepareContractCall({ 
    //    contract: maincontract, 
    //    method: resolveMethod("setReferralCode"), 
    //    params: [referralCodeHash]
    //  });
  //
    //  const transact = await sendTransaction(transaction);
    //  console.log(transact);


       console.log(call);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Reset loading to false after operation completes
    }
    };
  
   
   

    const BuyTokensWithEthReferal = async () => {
      try {
        setLoading(true);
       
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractaddress = "0x5Af23C7c84765eF5bC86fED70fb6c08c862759D9";
        const abi = [
          {
            "type": "function",
            "name": "buyTokensWithBNBAndReferral",
            "inputs": [
              {
                "type": "uint256",
                "name": "_tokenAmount",
                "internalType": "uint256"
              },
              {
                "type": "bytes32",
                "name": "_referralCode",
                "internalType": "bytes32"
              }
            ],
            "outputs": [],
            "stateMutability": "payable"
          }
        ]
        // Create a contract factory using the ABI and bytecode
        const contract = new ethers.Contract(contractaddress, abi, signer);
    
         // Calculate the value to send in Wei
         const valueInWei = ethers.utils.parseEther((amount).toString()); // Convert amount to Wei as a string
      
         // Set the overrides for sending Ethereum
         const overrides = {
            value: valueInWei
         };

          // Check if the referral code is provided
       const referralCode = ethreferalcode || "0x0000000000000000000000000000000000000000000000000000000000000000";
  
        const call = await contract.buyTokensWithBNBAndReferral(valueInWei,referralCode,overrides);


     //   const transaction = await prepareContractCall({ 
      //    contract: maincontract, 
      //    method: resolveMethod("buyTokensWithBNBAndReferral"), 
      //    params: [valueInWei, referralCode],
      //    value: valueInWei
     //   });
    //
      //  const transact = await sendTransaction(transaction);
    

     //   console.log(transact);

        
        console.log(call);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Reset loading to false after operation completes
    }
    };

    const approveUSDC = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractaddress = "0xE76e8f3aA088E92aD86981134ca24E27D32397aB";
        const abi = [
          {
            "type": "function",
            "name": "approve",
            "inputs": [
              {
                "type": "address",
                "name": "spender",
                "internalType": "address"
              },
              {
                "type": "uint256",
                "name": "value",
                "internalType": "uint256"
              }
            ],
            "outputs": [
              {
                "type": "bool",
                "name": "",
                "internalType": "bool"
              }
            ],
            "stateMutability": "nonpayable"
          }
        ]

        const contract = new ethers.Contract(contractaddress, abi, signer);

        const loanContractAddress = "0x5Af23C7c84765eF5bC86fED70fb6c08c862759D9";
  
        const weiAmount = usdcamount * 10**6;

        const call = await contract.approve(loanContractAddress,weiAmount);
  
        console.log(weiAmount)

     //   const transaction = await prepareContractCall({ 
     //     contract: usdtcontract, 
     //     method: resolveMethod("approve"), 
      //    params: [loanContractAddress,weiAmount],
      //  });
    
      //  const transact = await sendTransaction(transaction);
      //  console.log(transact);
    
        console.log("Token approval successful!");
      } catch (error) {
        console.error("Error approving token:", error);
      }
    };

    const BuyTokensWithUSDCReferal = async () => {
      try {
        setLoading(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractaddress = "0x5Af23C7c84765eF5bC86fED70fb6c08c862759D9";

        const abi = [
          {
            "type": "function",
            "name": "buyTokensWithUSDTReferal",
            "inputs": [
              {
                "type": "uint256",
                "name": "amount",
                "internalType": "uint256"
              },
              {
                "type": "bytes32",
                "name": "_referralCode",
                "internalType": "bytes32"
              }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
          }
        ]

        const contract = new ethers.Contract(contractaddress, abi, signer);
     
           // Check if the referral code is provided
       const referralCode = usdcreferalcode || "0x0000000000000000000000000000000000000000000000000000000000000000";
    
        
        const call = await contract.buyTokensWithUSDTReferal(usdcamount,referralCode);
    //  const transaction = await prepareContractCall({ 
    //    contract: maincontract, 
    //    method: resolveMethod("buyTokensWithUSDTReferal"), 
     //   params: [usdcamount, referralCode],
     // });
  
     // const transact = await sendTransaction(transaction);
    //  console.log(transact);
    //    
        console.log(call);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Reset loading to false after operation completes
    }
    };

  
    const ClaimTokens = async () => {
      try {
        setLoading(true);

        // Deploy the compiled contract using MetaMask
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
    
    
        const contractaddress = "0x5Af23C7c84765eF5bC86fED70fb6c08c862759D9";
       const abi = [
        {
          "type": "function",
          "name": "claimTokens",
          "inputs": [],
          "outputs": [],
          "stateMutability": "nonpayable"
        }
       ]
      
    
        // Create a contract factory using the ABI and bytecode
       const contract = new ethers.Contract(contractaddress, abi, signer);
    
        
       const call = await contract.claimTokens();

      // const transaction = await prepareContractCall({ 
     //   contract: maincontract, 
     //   method: resolveMethod("claimTokens"), 
     //   params: [],
     // });
  
     // const transact = await sendTransaction(transaction);
//console.log(transact);
//
        
        console.log(call);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Reset loading to false after operation completes
    }
    };

   
    const ClaimRewards = async () => {
      try {
        setLoading(true);

      
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
    
    
        const contractaddress = "0x5Af23C7c84765eF5bC86fED70fb6c08c862759D9";

        const abi = [
          {
            "type": "function",
            "name": "withdrawReferralReward",
            "inputs": [],
            "outputs": [],
            "stateMutability": "nonpayable"
          }
        ]

        const contract = new ethers.Contract(contractaddress, abi, signer);
        
        const call = await contract.withdrawReferralReward();

     // const transaction = await prepareContractCall({ 
     //   contract: maincontract, 
     //   method: resolveMethod("withdrawReferralReward"), 
     //   params: [],
     // });
  
     // const transact = await sendTransaction(transaction);
     // console.log(transact);

        
        console.log(call);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Reset loading to false after operation completes
    }
    };



    

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
      };




  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative" ref={parallaxRef}>
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          <h1 className="h1 mb-6">
            Become an  Investor of&nbsp;Our&nbsp;New Project {` `}
            <span className="inline-block relative">
              NextZen Alpha{" "}
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h1>
          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
          Step into the AI-powered crypto revolution. Join our presale journey to be part of reshaping the intersection of technology and finance.
          </p>
          <Button href="/pricing" white>
            Get started
          </Button>
        </div>
        <div className="relative" style={{width:"fit-content",margin:"auto"}}>
          <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
            <div className="relative bg-n-8 rounded-[1rem]">
              <div className="  rounded-t-[0.9rem]" />

              <div className=" rounded-b-[0.9rem] overflow-hidden ">
             
               







              <div className="flex justify-center">
  <div className="max-w-md">
    <div className=" p-6 rounded-[1.375rem] border border-gray-800" style={{background:'rgba(14,12,21,1)'}}>
      <h2 className="text-white font-bold mb-2 text-xl md:text-2xl">Buy $BFC Token</h2>
      <p className="text-green-300 text-sm">Stage 7 • LIVE</p>
      <div className="bg-green-500 rounded-md h-2 mt-4">
        <div className="bg-green-300 h-full rounded-md" style={{ width: '87.586%' }}></div>
      </div>
      <div className="flex justify-between mt-4 flex-col md:flex-row">
        <p className="text-white mb-2 md:mb-0">1$BFC=$1</p>
        <p className="text-white">LISTING PRICE = $0.065</p>
      </div>
      <div className="border border-gray-700 rounded-md p-4 mt-4 flex">
        <div className="mr-4">
          <p className="text-white font-bold mb-2">TOKENS SOLD</p>
          <p className="text-purple-300 font-bold text-xl md:text-2xl">350,342,700</p>
        </div>
        <div className="border-l border-gray-700 pl-4">
          <p className="text-white font-bold mb-2">USD RAISED</p>
          <p className="text-purple-300 font-bold text-xl md:text-2xl">$ 12,964,733</p>
        </div>
      </div>
   {/*   <div className="mt-4 flex flex-col md:flex-row" style={{justifyContent:'center'}}>
        <button className="bg-purple-600 text-white hover:bg-purple-700 mb-2 md:mb-0 md:mr-2 flex items-center px-4 py-2"  onClick={() => handlePaymentMethodChange('eth')}  >
          <i className="fab fa-ethereum mr-2"></i>
          BUY WITH BNB
        </button>
        <button className="bg-green-500 text-white hover:bg-green-600 flex items-center px-4 py-2" onClick={() => handlePaymentMethodChange('usdc')} >
          <i className="fas fa-dollar-sign mr-2"></i>
          BUY WITH USDT
        </button>
  </div> */}
      <div className="mt-4 flex flex-col md:flex-row" style={{justifyContent:'center'}}>
        <button className="bg-purple-600 text-white hover:bg-purple-700 mb-2 md:mb-0 md:mr-2 flex items-center px-4 py-2"  onClick={() => handlePaymentMethodChange('ethreferal')}  >
          <i className="fab fa-ethereum mr-2"></i>
          BUY WITH MATIC
        </button>
        

        <button className="bg-green-500 text-white hover:bg-green-600 flex items-center px-4 py-2" onClick={() => handlePaymentMethodChange('usdcreferal')} >
          <i className="fas fa-dollar-sign mr-2"></i>
          BUY WITH USDT
</button> 
      </div>
      <div className="mt-4 flex flex-col md:flex-row items-center">

    
      {paymentMethod === 'eth' ? (
        <>
         <input className="text-white bg-gray-700 border border-gray-700 rounded-md px-4 py-2 mb-2 md:mb-0 " value={amount} type="text" placeholder="Enter Amount (BNB)" onChange={(e) => setAmount(e.target.value)} style={{ width: '100%' }} />
      
        </>
      ) : paymentMethod === 'usdc' ? (
        <>
        <input className="text-white bg-gray-700 border border-gray-700 rounded-md px-4 py-2 mb-2 md:mb-0" value={usdcamount} type="text" placeholder="Enter Amount (USDT)" onChange={(e) => setUsdcAmount(e.target.value)} style={{ width: '100%' }} />
     {/*   <p className="text-purple-300 font-bold text-xl md:text-2xl">0</p>*/}
        </>
      ) : paymentMethod === 'ethreferal' ? (
        <>
        <div>
        <input className="text-white bg-gray-700 border border-gray-700 rounded-md px-4 py-2 mb-2 md:mb-2" value={amount} type="text" placeholder="Enter Amount (BNB)" onChange={(e) => setAmount(e.target.value)} style={{ width: '100%' }} />
        <input className="text-white bg-gray-700 border border-gray-700 rounded-md px-4 py-2 mb-2 md:mb-2" value={ethreferalcode} type="text" placeholder="Enter Referal Code" onChange={(e) => setEthReferal(e.target.value)} style={{ width: '100%' }} />
        <input className="text-white bg-gray-700 border border-gray-700 rounded-md px-4 py-2 mb-2 md:mb-2" value={walletaddress} type="text" placeholder="Enter Your Wallet Address" onChange={(e) => setWalletaddress(e.target.value)} style={{ width: '100%' }} />


        

<CrossmintPayButton
className="w-full"
collectionId="be921c27-7caa-4253-8efc-8da933a62597"
projectId="ea126e6d-8bae-4f49-93c7-bcbc58d61e44"
                mintConfig={{"totalPrice":(amount).toString(),"_tokenAmount":(amount * 1e18).toString(),"_useraddress": walletaddress,"_referralCode": ethreferalcode || "0x0000000000000000000000000000000000000000000000000000000000000000"}}
                
                checkoutProps={{"paymentMethods":["fiat"]}}
            />



        </div>
        </>
      ) : paymentMethod === 'usdcreferal' ? (
        <>
         <div>
        <input className="text-white bg-gray-700 border border-gray-700 rounded-md px-4 py-2 mb-2 md:mb-2" value={usdcamount} type="text" placeholder="Enter Amount (USDT)" onChange={(e) => setUsdcAmount(e.target.value)} style={{ width: '100%' }} />
        <input className="text-white bg-gray-700 border border-gray-700 rounded-md px-4 py-2 mb-2 md:mb-2" value={usdcreferalcode} type="text" placeholder="Enter Referal Code" onChange={(e) => setUsdcReferal(e.target.value)} style={{ width: '100%' }} />
        <input className="text-white bg-gray-700 border border-gray-700 rounded-md px-4 py-2 mb-2 md:mb-2" value={walletaddress} type="text" placeholder="Enter Your Wallet Address" onChange={(e) => setWalletaddress(e.target.value)} style={{ width: '100%' }} />
        

        <CrossmintPayButton
        className="w-full"
        collectionId="f982b726-de44-4375-867e-8aa4cd8077cc"
        projectId="b473b8a1-7bac-4a18-8732-01d5ecd0e193"
                mintConfig={{"totalPrice":(amount).toString(),"amount":(amount * 10 ** 6).toString(),"_useraddress": walletaddress,"_referralCode": ethreferalcode || "0x0000000000000000000000000000000000000000000000000000000000000000"}}
                environment="staging"
                checkoutProps={{"paymentMethods":["fiat"]}}
                
            />





        
        </div>
    
        




        </>
      ) : null} 
     
      </div>
    
     
      {!account ? (
        <>
         {/* <button
    className="bg-purple-600 text-white hover:bg-purple-700 w-full py-2 mt-4"
      onClick={connectWallet}
    >
      Connect Wallet
      </button> */}
        </>
  
  ) : (
    <>
  {paymentMethod === 'eth' ? (
    <>
      <button className="bg-purple-600 text-white hover:bg-purple-700 w-full py-2 mt-4" onClick={BuyTokens}>BUY NOW WITH BNB</button>

      <button className="bg-purple-600 text-white hover:bg-purple-700 w-full py-2 mt-4" onClick={GenerateReferalCode}>Generate Referal Code</button>

      <button className="bg-purple-600 text-white hover:bg-purple-700 w-full py-2 mt-4" onClick={FetchReferalcode}>Check Referal Code</button>

      <button className="bg-purple-600 text-white hover:bg-purple-700 w-full py-2 mt-4" onClick={ClaimTokens}>Claim Tokens</button>

      <button className="bg-purple-600 text-white hover:bg-purple-700 w-full py-2 mt-4" onClick={ClaimRewards}>Claim Rewards</button>

      {userreferalcode && (
  <div className="mt-4 flex flex-col items-center">
  <p className="text-white mb-2">Your Referral Code:</p>
  <div className="flex items-center bg-gray-700 rounded-md px-4 py-2">
    <span className="text-purple-300 font-bold mr-2">{userreferalcode.slice(0, 6)}...{usdcreferalcode.slice(-4)}</span>
    <button
      className="text-white hover:text-purple-300 focus:outline-none"
      onClick={() => navigator.clipboard.writeText(userreferalcode)}
    >
      copy
    </button>
  </div>
</div>
      )}
    
    </>
  ) : paymentMethod === 'usdc' ? (
    <>
    <button className="bg-purple-600 text-white hover:bg-purple-700 w-full py-2 mt-4" onClick={approveUSDC}>Approve USDT</button>

    <button className="bg-purple-600 text-white hover:bg-purple-700 w-full py-2 mt-4" onClick={BuyTokenswithUSDC}>BUY NOW WITH USDT</button>

    <button className="bg-purple-600 text-white hover:bg-purple-700 w-full py-2 mt-4" onClick={GenerateReferalCode}>Generate Referal Code</button>

    <button className="bg-purple-600 text-white hover:bg-purple-700 w-full py-2 mt-4" onClick={FetchReferalcode}>Check Referal Code</button>

    <button className="bg-purple-600 text-white hover:bg-purple-700 w-full py-2 mt-4" onClick={ClaimTokens}>Claim Tokens</button>

    <button className="bg-purple-600 text-white hover:bg-purple-700 w-full py-2 mt-4" onClick={ClaimRewards}>Claim Rewards</button>

    {userreferalcode && (
  <div className="mt-4 flex flex-col items-center">
  <p className="text-white mb-2">Your Referral Code:</p>
  <div className="flex items-center bg-gray-700 rounded-md px-4 py-2">
    <span className="text-purple-300 font-bold mr-2">{userreferalcode.slice(0, 6)}...{usdcreferalcode.slice(-4)}</span>
    <button
      className="text-white hover:text-purple-300 focus:outline-none"
      onClick={() => navigator.clipboard.writeText(userreferalcode)}
    >
      copy
    </button>
  </div>
</div>
      )}
    </>
  ) : paymentMethod === 'ethreferal' ? (
    <>
     {/*<button className="bg-purple-600 text-white hover:bg-purple-700 w-full py-2 mt-4" onClick={BuyTokensWithEthReferal}>BUY NOW WITH BNB</button>

    <button className="bg-purple-600 text-white hover:bg-purple-700 w-full py-2 mt-4" onClick={GenerateReferalCode}>Generate Referal Code</button>

<button className="bg-purple-600 text-white hover:bg-purple-700 w-full py-2 mt-4" onClick={FetchReferalcode}>Check Referal Code</button>
      
      <button className="bg-purple-600 text-white hover:bg-purple-700 w-full py-2 mt-4" onClick={ClaimTokens}>Claim Tokens</button>

      <button className="bg-purple-600 text-white hover:bg-purple-700 w-full py-2 mt-4" onClick={ClaimRewards}>Claim Rewards</button>
  */}

    {userreferalcode && (
  <div className="mt-4 flex flex-col items-center">
  <p className="text-white mb-2">Your Referral Code:</p>
  <div className="flex items-center bg-gray-700 rounded-md px-4 py-2">
    <span className="text-purple-300 font-bold mr-2">{userreferalcode.slice(0, 6)}...{usdcreferalcode.slice(-4)}</span>
    <button
      className="text-white hover:text-purple-300 focus:outline-none"
      onClick={() => navigator.clipboard.writeText(userreferalcode)}
    >
      copy
    </button>
  </div>
</div>
      )}
    </>
  ) : paymentMethod === 'usdcreferal' ? (
    <>
 <button className="bg-purple-600 text-white hover:bg-purple-700 w-full py-2 mt-4" onClick={approveUSDC}>Approve USDT</button>

    <button className="bg-purple-600 text-white hover:bg-purple-700 w-full py-2 mt-4" onClick={BuyTokensWithUSDCReferal}>BUY NOW WITH USDT</button>

    <button className="bg-purple-600 text-white hover:bg-purple-700 w-full py-2 mt-4" onClick={GenerateReferalCode}>Generate Referal Code</button>

<button className="bg-purple-600 text-white hover:bg-purple-700 w-full py-2 mt-4" onClick={FetchReferalcode}>Check Referal Code</button>
<button className="bg-purple-600 text-white hover:bg-purple-700 w-full py-2 mt-4" onClick={ClaimTokens}>Claim Tokens</button>

<button className="bg-purple-600 text-white hover:bg-purple-700 w-full py-2 mt-4" onClick={ClaimRewards}>Claim Rewards</button>



    {userreferalcode && (
  <div className="mt-4 flex flex-col items-center">
  <p className="text-white mb-2">Your Referral Code:</p>
  <div className="flex items-center bg-gray-700 rounded-md px-4 py-2">
    <span className="text-purple-300 font-bold mr-2">{userreferalcode.slice(0, 6)}...{usdcreferalcode.slice(-4)}</span>
    <button
      className="text-white hover:text-purple-300 focus:outline-none"
      onClick={() => navigator.clipboard.writeText(userreferalcode)}
    >
      copy
    </button>
  </div>
</div>
      )}
    </>
  ) : null}

  </>
  )}






      <div className="mt-4 flex justify-center">
        
      </div>
    </div>
  </div>
</div>









               
              </div>
            </div>

           
          </div>
          <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]">
            <img
              src={heroBackground}
              className="w-full"
              width={1440}
              height={1800}
              alt="hero"
            />
          </div>

          <BackgroundCircles />
        </div>

        <CompanyLogos className="hidden relative z-10 mt-20 lg:block" />
      </div>

      <BottomLine />
    </Section>
  );
};

export default Hero;
