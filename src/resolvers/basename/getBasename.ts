import { base } from "viem/chains";
import { getPublicClient } from "../../utils/getPublicClient.js";
import type { Address } from "viem";
import L2ResolverAbi from "./abis/L2ResolverAbi.js";
import { convertReverseNodeToBytes } from "../../utils/convertReverseNodeToBytes.js";

type GetBaseNameParameters = {
  address: Address;
};

type GetBaseNameReturnType = string | null;

const RESOLVER_ADDRESS = "0xC6d566A56A1aFf6508b41f6c90ff131615583BCD";

/**
 * Resolves an address to basename. Only works with base mainnet.
 *
 * @param {GetBaseNameParameters} params - Object containing address to resolve
 * @returns {Promise<GetBaseNameReturnType>} The basename or null if not found
 * @example
 * const name = await getBasename({
 *   address: "0xC79E675A8Dd11fBEc7Ea1042efB6686C9DfdC57E"
 * })
 * // 'obliques.base.eth'
 */

export async function getBaseName({
  address,
}: Pick<GetBaseNameParameters, "address">): Promise<GetBaseNameReturnType> {
  const client = getPublicClient(base);
  const addressReverseNode = convertReverseNodeToBytes(address, base);

  const name = await client.readContract({
    abi: L2ResolverAbi,
    address: RESOLVER_ADDRESS,
    functionName: "name",
    args: [addressReverseNode],
  });
  if (name) return name;
  return null;
}
