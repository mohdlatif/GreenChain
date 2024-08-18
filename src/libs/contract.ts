import { Keypair, TransactionBuilder } from '@stellar/stellar-sdk'
import stellar from '@stellar/typescript-wallet-sdk'
import { Spec, Client } from '@stellar/stellar-sdk/contract'
import { Server } from '@stellar/stellar-sdk/rpc'
const rpc_url = 'https://soroban-testnet.stellar.org'
const network_passphrase = 'Test SDF Network ; September 2015'
const CONTRACT_ID = import.meta.env.PUBLIC_CONTRACT_ID
const PRIVATE_KEY = import.meta.env.OPERATOR_PRIVATE_KEY

const contractSpec = new Spec([
  'AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAAAAAAA=',
  'AAAAAAAAAAAAAAAKbG9nX2FjdGlvbgAAAAAAAwAAAAAAAAAEdXNlcgAAABMAAAAAAAAABmFjdGlvbgAAAAAAEAAAAAAAAAAGaW1wYWN0AAAAAAAEAAAAAQAAAAQ=',
  'AAAAAAAAAAAAAAAOZ2V0X3VzZXJfc2NvcmUAAAAAAAEAAAAAAAAABHVzZXIAAAATAAAAAQAAAAQ=',
  'AAAAAAAAAAAAAAAQZ2V0X3VzZXJfYWN0aW9ucwAAAAEAAAAAAAAABHVzZXIAAAATAAAAAQAAA+oAAAAQ',
  'AAAAAAAAAAAAAAAQZ2V0X3RvdGFsX2ltcGFjdAAAAAAAAAABAAAABA==',
  'AAAAAAAAAAAAAAARY2FsY3VsYXRlX3Jld2FyZHMAAAAAAAABAAAAAAAAAAR1c2VyAAAAEwAAAAEAAAAE',
])

const keypair = Keypair.fromSecret(PRIVATE_KEY)
const client = new Client(contractSpec, {
  contractId: CONTRACT_ID,
  networkPassphrase: network_passphrase,
  publicKey: keypair.publicKey(),
  rpcUrl: rpc_url,
})

// const server = new Server(rpc_url)
// Submits a tx and then polls for its status until a timeout is reached.

// export const logAction = async (
//   user: string,
//   action: string,
//   impact: number,
// ) => {
//   try {
//     const tx = await client.options.contractId
//     const result = contractSpec.funcResToNative('log_action', tx.result.retval)
//     console.log('Action logged:', result)

//     return result
//   } catch (error) {
//     console.error('Error logging action:', error)
//     throw error
//   }
// }
// const testLogAction = async () => {
//   try {
//     const user = 'user_address_here'
//     const action = 'recycling'
//     const impact = 10

//     const result = await logAction(user, action, impact)
//     console.log('LogAction result:', result)
//   } catch (error) {
//     console.error('Error in testLogAction:', error)
//   }
// }

// testLogAction()
