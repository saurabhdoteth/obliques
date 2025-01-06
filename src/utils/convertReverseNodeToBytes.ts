import { encodePacked, keccak256, namehash } from "viem";
import type { Address, Chain, Hex } from "viem";
import { convertChainToCoinType } from "./convertChainToCoinType.js";

/**
 * Converts an address and chain into a reverse node bytes32 value for reverse resolution.
 *
 * @param {Address} address - The address to convert
 * @param {Chain} chain - The chain object containing network details
 * @returns {Hex} The reverse node as a bytes32 hex string
 */

export const convertReverseNodeToBytes = (
  address: Address,
  chain: Chain
): Hex => {
  const addressFormatted = address.toLocaleLowerCase() as Address;
  const addressNode = keccak256(addressFormatted.substring(2) as Address);
  const chainCoinType = convertChainToCoinType(chain);
  const reverseNode = namehash(`${chainCoinType}.reverse`);
  const addressReverseNode = keccak256(
    encodePacked(["bytes32", "bytes32"], [reverseNode, addressNode])
  );
  return addressReverseNode;
};
