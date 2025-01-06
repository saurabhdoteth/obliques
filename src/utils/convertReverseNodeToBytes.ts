import { encodePacked, keccak256, namehash } from "viem";
import type { Address, Chain } from "viem";
import { convertChainToCoinType } from "./convertChainToCoinType.js";

/**
 * Converts an address and chain into a reverse node bytes32 value for reverse resolution.
 *
 * The process:
 * 1. Formats and hashes the address
 * 2. Gets the chain's SLIP-0044 coin type
 * 3. Creates the base reverse node from the coin type
 * 4. Combines and hashes the base node with address node
 *
 * @param {Address} address - The address to convert
 * @param {Chain} chain - The chain object containing network details
 * @returns {`0x${string}`} The reverse node as a bytes32 hex string
 */

export const convertReverseNodeToBytes = (address: Address, chain: Chain) => {
  const addressFormatted = address.toLocaleLowerCase() as Address;
  const addressNode = keccak256(addressFormatted.substring(2) as Address);
  const chainCoinType = convertChainToCoinType(chain);
  const baseReverseNode = namehash(
    `${chainCoinType.toLocaleUpperCase()}.reverse`
  );
  const addressReverseNode = keccak256(
    encodePacked(["bytes32", "bytes32"], [baseReverseNode, addressNode])
  );
  return addressReverseNode;
};
