import type { Chain } from "viem";
import { cyber, mainnet } from "viem/chains";

/**
 * Converts a chain ID to a SLIP-0044 coin type hex string for reverse chain resolution.
 *
 * For Ethereum mainnet, returns "addr" as a special case.
 * For other chains, applies the SLIP-0044 formula: 0x80000000 | chainId
 * The result is converted to an uppercase hex string.
 *
 * @see {@link https://github.com/satoshilabs/slips/blob/master/slip-0044.md} SLIP-0044 spec
 *
 * @param {Chain} chain - The chain object containing the ID to convert
 * @returns The coin type as an uppercase hex string, or "addr" for mainnet
 * @example
 * convertChainToCoinType(mainnet) // Returns "addr"
 * convertChainToCoinType(base) // Returns "80002105"
 */

export function convertChainToCoinType(chain: Chain) {
  if (chain.id === mainnet.id || chain.id === cyber.id) return "addr";

  const cointype = (0x80000000 | chain.id) >>> 0;
  return cointype.toString(16).toLocaleUpperCase();
}
