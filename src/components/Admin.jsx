import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ethers } from 'ethers';


const MyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const [saleStatus, setSaleStatus] = useState('Unpause');

 

  const [status, setStatus] = useState('');
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState('');
  const [usdcprice, setUsdcPrice] = useState("");
  const [tokenprice, setTokenPrice] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("eth");
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [walletaddress, setWalletaddress] = useState("");
  const [tokensend, setTokenSend] = useState("");

  const [selectedOption, setSelectedOption] = useState(null); // Track selected option

  const handleOptionSelect = (option) => {
      setSelectedOption(option); // Update selected option
  };

  const handleStatusClick = async () => {
      if (selectedOption === 'pause') {
          await PauseSale(); // Call pause function if selected
      } else if (selectedOption === 'unpause') {
          await UnPause(); // Call unpause function if selected
      }
  };

  const handleStartTimeChange = (date) => {
      setStartTime(date);
  };
  
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
 
  const UsdcPrice = async () => {
    try {
      setLoading(true);
      // Deploy the compiled contract using MetaMask
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
  
  
      const contractaddress = "0x5be5e22728b864cd5a80306e45b4f569ad151f62";
      const abi = [
          {
              "type": "function",
              "name": "setUSDCTokenPrice",
              "inputs": [
                {
                  "type": "uint256",
                  "name": "_newPrice",
                  "internalType": "uint256"
                }
              ],
              "outputs": [],
              "stateMutability": "nonpayable"
            }
      ];
  
      // Create a contract factory using the ABI and bytecode
      const contract = new ethers.Contract(contractaddress, abi, signer);
  

      const call = await contract.setUSDCTokenPrice(BigInt(usdcprice * 10**18));
      
      console.log(call);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Reset loading to false after operation completes
  }
  };

  const PauseSale = async () => {
      try {
        setLoading(true);
        // Deploy the compiled contract using MetaMask
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
    
    
        const contractaddress = "0x5be5e22728b864cd5a80306e45b4f569ad151f62";
        const abi = [
          {
              "type": "function",
              "name": "pause",
              "inputs": [],
              "outputs": [],
              "stateMutability": "nonpayable"
            }
        ];
    
        // Create a contract factory using the ABI and bytecode
        const contract = new ethers.Contract(contractaddress, abi, signer);
    
  
        const call = await contract.pause();
        
        console.log(call);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Reset loading to false after operation completes
    }
    };
  
    const UnPause = async () => {
      try {
        setLoading(true);
        // Deploy the compiled contract using MetaMask
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
    
    
        const contractaddress = "0x5be5e22728b864cd5a80306e45b4f569ad151f62";
        const abi = [
          {
              "type": "function",
              "name": "unpause",
              "inputs": [],
              "outputs": [],
              "stateMutability": "nonpayable"
            }
        ];
    
        // Create a contract factory using the ABI and bytecode
        const contract = new ethers.Contract(contractaddress, abi, signer);
    
  
        const call = await contract.unpause();
        
        console.log(call);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Reset loading to false after operation completes
    }
    };
  


  const TokenPrice = async () => {
    try {
      setLoading(true);

     
      // Deploy the compiled contract using MetaMask
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
  
  
      const contractaddress = "0x5be5e22728b864cd5a80306e45b4f569ad151f62";
      const abi = [
          {
              "type": "function",
              "name": "setTokenPrice",
              "inputs": [
                {
                  "type": "uint256",
                  "name": "_newPrice",
                  "internalType": "uint256"
                }
              ],
              "outputs": [],
              "stateMutability": "nonpayable"
            }
      ];
  
      // Create a contract factory using the ABI and bytecode
      const contract = new ethers.Contract(contractaddress, abi, signer);
  
      const tokenPrice = ethers.utils.parseUnits(tokenprice, 18);

      const call = await contract.setTokenPrice(tokenPrice);
      
      console.log(call);
    } catch (error) {
      console.error(error);
    }  finally {
      setLoading(false); // Reset loading to false after operation completes
  }
  };

  const TokenStartTime = async () => {
      try {
        setLoading(true);

       
        // Deploy the compiled contract using MetaMask
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
    
    
        const contractaddress = "0x5be5e22728b864cd5a80306e45b4f569ad151f62";
        const abi = [
          {
              "type": "function",
              "name": "setStartTime",
              "inputs": [
                {
                  "type": "uint256",
                  "name": "_newStartTime",
                  "internalType": "uint256"
                }
              ],
              "outputs": [],
              "stateMutability": "nonpayable"
            }
        ];
    
        // Create a contract factory using the ABI and bytecode
        const contract = new ethers.Contract(contractaddress, abi, signer);
    
        const unixTimestamp = Math.floor(startTime.getTime() / 1000); // Convert selected date to Unix timestamp
        const call = await contract.setStartTime(unixTimestamp);
        
        console.log(call);
      } catch (error) {
        console.error(error);
      }  finally {
        setLoading(false); // Reset loading to false after operation completes
    }
    };


    const SendAirdrop = async () => {
      try {
        setLoading(true);
        // Deploy the compiled contract using MetaMask
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
    
    
        const contractaddress = "0x5be5e22728b864cd5a80306e45b4f569ad151f62";
        const abi = [
          {
            "type": "function",
            "name": "airdrop",
            "inputs": [
              {
                "type": "address[]",
                "name": "recipients",
                "internalType": "address[]"
              },
              {
                "type": "uint256[]",
                "name": "amounts",
                "internalType": "uint256[]"
              }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
          }
        ];
    
        // Create a contract factory using the ABI and bytecode
        const contract = new ethers.Contract(contractaddress, abi, signer);
    
  
         // Convert input strings to arrays
       const walletAddressArray = walletaddress.split(',');
       const amountArray = tokensend.split(',').map(amount => ethers.utils.parseUnits(amount, 18));
       console.log("amounts",amountArray);
       console.log("walletaddress",walletAddressArray);

       const call = await contract.airdrop(walletAddressArray, amountArray);
        
        console.log(call);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Reset loading to false after operation completes
    }
    };

  const handleSaleStatusChange = () => {
    setSaleStatus(saleStatus === 'Unpause' ? 'Pause' : 'Unpause');
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div>
      <button
        type="button"
        className="hidden lg:flex mr-4"
        onClick={handleOpenModal}
      >
        Admin
      </button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
     
    

       <div className=" text-white p-4" style={{background:'rgba(22,24,28,1)',borderRadius:'20px',marginBottom:'30px'}}>
      <div className="mb-4">
        <p className="text-sm font-semibold mb-2">Change Start Time</p>
        <div className=" p-2 rounded-md flex justify-between items-center" style={{background:'rgba(34,36,41,1)',border:'1px solid #3e424ab3'}}>
          <span>
          <DatePicker
                    selected={startTime}
                    onChange={handleStartTimeChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="date-picker" // Add custom class
                />
          </span>
          <button className="bg-gray-700 text-white px-3 py-1 rounded-md" onClick={TokenStartTime}  >Time</button>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm font-semibold mb-2">Change Sale Status</p>
        <div className=" p-2 rounded-md flex justify-between items-center" style={{background:'rgba(34,36,41,1)',border:'1px solid #3e424ab3'}} >
          <div>
            <button
             onClick={() => handleOptionSelect('unpause')}
              className={`mr-2 px-3 py-1 rounded-md ${
                selectedOption === 'pause' ? 'bg-red-500' : 'bg-green-500'
              }`}
            >
              {saleStatus}
            </button>
            <button
            onClick={() => handleOptionSelect('pause')}
              className={`px-3 py-1 rounded-md ${
                selectedOption === 'unpause' ? 'bg-red-500' : 'bg-green-500'
              }`}
            >
              {saleStatus === 'Pause' ? 'Unpause' : 'Pause'}
            </button>
          </div>
          <button className="bg-gray-700 text-white px-3 py-1 rounded-md" onClick={handleStatusClick} >Status</button>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm font-semibold mb-2">Change Token Price</p>
        <div className=" p-2 rounded-md flex justify-between items-center" style={{background:'rgba(34,36,41,1)',border:'1px solid #3e424ab3'}} >
          <input
            type="text"
            value={tokenprice}
            onChange={(e) => setTokenPrice(e.target.value)}
            placeholder="Enter Token Price"
            className="bg-transparent text-white placeholder-gray-500 outline-none flex-grow"
          />
          <button className="bg-gray-700 text-white px-3 py-1 rounded-md" onClick={TokenPrice} >Change</button>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm font-semibold mb-2">Change USDC Price</p>
        <div className=" p-2 rounded-md flex justify-between items-center" style={{background:'rgba(34,36,41,1)',border:'1px solid #3e424ab3'}} >
          <input
            type="text"
            value={usdcprice}
            onChange={(e) => setUsdcPrice(e.target.value)}
            placeholder="Enter USDC Price"
            className="bg-transparent text-white placeholder-gray-500 outline-none flex-grow"
          />
          <button className="bg-gray-700 text-white px-3 py-1 rounded-md" onClick={UsdcPrice} >Change</button>
        </div>
      </div>
    </div>



{/* airdrop  */}


<div className=" text-white p-4" style={{background:'rgba(22,24,28,1)',borderRadius:'20px',marginBottom:'30px'}}>
      

      <div className="mb-4">
        <p className="text-sm font-semibold mb-2">Send Airdrop</p>
        <div className=" p-2 rounded-md flex justify-between items-center" style={{background:'rgba(34,36,41,1)',border:'1px solid #3e424ab3'}} >
          <input
            type="text"
            style={{background:'rgba(84,88,98,1)',padding:"10px",borderRadius:'5px',width:'9%',marginRight:'20px'}}
            value={walletaddress}
            onChange={(e) => setWalletaddress(e.target.value)}
            placeholder="Enter Wallet Addresses"
            className="bg-transparent text-white placeholder-gray-900 outline-none flex-grow"
          />
           <input
            type="text"
            style={{background:'rgba(84,88,98,1)',padding:"10px",borderRadius:'5px',width:'9%',marginRight:'20px'}}
            value={tokensend}
            onChange={(e) => setTokenSend(e.target.value)}
            placeholder="Enter Amounts"
            className="bg-transparent text-white placeholder-gray-900 outline-none flex-grow"
          />
          <button className="bg-gray-700 text-white px-3 py-1 rounded-md" onClick={SendAirdrop} >Send</button>
        </div>
      </div>
    </div>






       
      </Modal>
    </div>
  );
};

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" style={{marginTop:'280px'}}>
          <div className="bg-n-8 rounded-lg p-6" style={{width:'-webkit-fill-available',height:'38rem',overflowX:'auto'}}>
            <div className="flex justify-between items-center mb-4" style={{marginTop:'20px'}}>
              <h3 className="text-lg font-semibold" style={{margin:'auto'}}>Admin Section</h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-800 transition"
                onClick={onClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyPage;