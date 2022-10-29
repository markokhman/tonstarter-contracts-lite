import * as main from "../contracts/main";
import { Address, toNano, TupleSlice, WalletContract } from "ton";
import { sendInternalMessageWithWallet } from "../test/helpers";

// return the init Cell of the contract storage (according to load_data() contract method)
export function initData() {
  return main.data({
    address1: Address.parseFriendly("kQBMjM3cGuQ31SMLsdqWwEat26aG1a2b0DFHMIscnNfp5R-K").address,
    address2: Address.parseFriendly("EQASTHrOAK8Y5Zq0E659c6TY9GNNoAkqouit3eeHx3C1MMA-").address,
  });
}

// return the op that should be sent to the contract on deployment, can be "null" to send an empty message
export function initMessage() {
  return null;
}

// optional end-to-end sanity test for the actual on-chain contract to see it is actually working on-chain
export async function postDeployTest(walletContract: WalletContract, secretKey: Buffer, contractAddress: Address) {
  const call = await walletContract.client.callGetMethod(contractAddress, "meaning_of_life");
  const meaning = new TupleSlice(call.stack).readBigNumber();
  console.log(`   # Getter 'meaning_of_life' = ${meaning.toString()}`);

  await sendInternalMessageWithWallet({ walletContract, secretKey, to: contractAddress, value: toNano(0.2) });
  console.log(`   # Sent money to contract`);

  const call2 = await walletContract.client.callGetMethod(contractAddress, "balance");
  const balance = new TupleSlice(call2.stack).readBigNumber();
  console.log(`   # Getter 'balance' = ${balance.toString()}`);
}
