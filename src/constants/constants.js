import { chain } from "../chain";
import { client } from "../client";
import { getContract } from "thirdweb";
import abi from '../components/abi.json';


export const maincontract = getContract({
    client: client,
    chain: chain,
    address: "0x5Af23C7c84765eF5bC86fED70fb6c08c862759D9",
    abi: abi,
   });

  export const usdtcontract = getContract({
    client: client,
    chain: chain,
    address: "0xE76e8f3aA088E92aD86981134ca24E27D32397aB",
   });

