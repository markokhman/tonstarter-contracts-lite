import chai, { expect } from "chai";
import chaiBN from "chai-bn";
import BN from "bn.js";
chai.use(chaiBN(BN));

import { Cell } from "ton";
import { SmartContract } from "ton-contract-executor";
import * as main from "../contracts/main";
import { internalMessage, randomAddress } from "./helpers";

import { hex } from "../build/main.compiled.json";

describe("Counter tests", () => {
  let contract: SmartContract;

  beforeEach(async () => {
    contract = await SmartContract.fromCell(
      Cell.fromBoc(hex)[0], // code cell from build output
      main.data({
        address1: randomAddress("owner"),
        address2: randomAddress("owner"),
      })
    );
  });

  it("should get the meaning of life", async () => {
    const call = await contract.invokeGetMethod("meaning_of_life", []);
    expect(call.result[0]).to.be.bignumber.equal(new BN(42));
  });
});
