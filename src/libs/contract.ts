import { Keypair, TransactionBuilder } from '@stellar/stellar-sdk'

import { Spec, Client } from '@stellar/stellar-sdk/contract'

const rpc_url = 'https://soroban-testnet.stellar.org:443'
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

export const test = () => {
  const contractId = keypair.publicKey()
}
