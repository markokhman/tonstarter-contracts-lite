import BN from "bn.js";
import { Cell, beginCell, Address } from "ton";

// // encode contract storage according to save_data() contract method
export function data(params: { address1: Address; address2: Address }): Cell {
  return beginCell().storeAddress(params.address1).storeAddress(params.address2).endCell();
}
