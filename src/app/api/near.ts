// lib/near.ts

import { connect, keyStores, utils } from "near-api-js";

const {
  NEAR_NETWORK = "testnet",
  CONTRACT_NAME,
  NEAR_PRIVATE_KEY,
  NEAR_ACCOUNT_ID,
} = process.env;

if (!CONTRACT_NAME || !NEAR_PRIVATE_KEY || !NEAR_ACCOUNT_ID) {
  throw new Error("Faltan variables de entorno para configurar NEAR.");
}

const keyStore = new keyStores.InMemoryKeyStore();
keyStore.setKey(
  NEAR_NETWORK,
  NEAR_ACCOUNT_ID,
  utils.KeyPair.fromString(`ed25519:${NEAR_PRIVATE_KEY}`)
);

export const near = connect({
  networkId: NEAR_NETWORK,
  keyStore,
  nodeUrl: `https://rpc.${NEAR_NETWORK}.near.org`,
  walletUrl: `https://wallet.${NEAR_NETWORK}.near.org`,
  helperUrl: `https://helper.${NEAR_NETWORK}.near.org`,
});

export const account = near.then((NEAR_ACCOUNT_ID) => {
  console.log(NEAR_ACCOUNT_ID);
});
