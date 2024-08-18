import { Keypair, TransactionBuilder } from "@stellar/stellar-sdk";
import { Client } from '@stellar/stellar-sdk/contract';


const CONTRACT_ID = import.meta.env.VITE_CONTRACT_ID
const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY

console.log(`Contract ID: ${CONTRACT_ID}`)
