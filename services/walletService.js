const { ethers } = require("ethers");
const TronWeb = require("tronweb");
const solanaWeb3 = require("@solana/web3.js");
const bitcoin = require("bitcoinjs-lib");
const { encrypt } = require("../utils/encrypt");

exports.generateWallet = async (chain) => {
  if (["ETH", "BSC", "POLYGON"].includes(chain)) {
    const wallet = ethers.Wallet.createRandom();
    return { address: wallet.address, privateKeyEncrypted: encrypt(wallet.privateKey) };
  }
  if (chain === "TRON") {
    const tronWeb = new TronWeb({ fullHost: "https://api.trongrid.io" });
    const acc = await tronWeb.createAccount();
    return { address: acc.address.base58, privateKeyEncrypted: encrypt(acc.privateKey) };
  }
  if (chain === "SOLANA") {
    const keypair = solanaWeb3.Keypair.generate();
    return { address: keypair.publicKey.toBase58(), privateKeyEncrypted: encrypt(Buffer.from(keypair.secretKey).toString("hex")) };
  }
  if (chain === "BTC") {
    const keyPair = bitcoin.ECPair.makeRandom();
    const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
    return { address, privateKeyEncrypted: encrypt(keyPair.toWIF()) };
  }
  throw new Error("Unsupported chain");
};
