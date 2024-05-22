import { chain } from "../chain";
import { client } from "../client";
import { getContract } from "thirdweb";
import abi from '../components/abi.json';


export const maincontract = getContract({
    client: client,
    chain: chain,
    address: "0x9F878d9309D7f7fe1d86099731FFa1242F270C0d",
    abi: abi,
   });

  export const usdtcontract = getContract({
    client: client,
    chain: chain,
    address: "0xE76e8f3aA088E92aD86981134ca24E27D32397aB",
   });

