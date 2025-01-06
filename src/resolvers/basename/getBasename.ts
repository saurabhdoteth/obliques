import { base } from "viem/chains";
import { getPublicClient } from "../../utils/getPublicClient.js";
import type { Address } from "viem";
import L2ResolverAbi from "./abis/L2ResolverAbi.js";
import { convertReverseNodeToBytes } from "../../utils/convertReverseNodeToBytes.js";

type GetBasenameParameters = {
  address: Address;
};

type GetBasenameReturnType = string | null;

const RESOLVER_ADDRESS = "0xC6d566A56A1aFf6508b41f6c90ff131615583BCD";

/**
 * Resolves an address to basename. Only works with base network.
 *
 * @param {GetBasenameParameters} params - Object containing address to resolve
 * @returns {Promise<GetBasenameReturnType>} The .base name or null if not found
 * @example
 * const name = await getBasename({
 *   address: "0xC79E675A8Dd11fBEc7Ea1042efB6686C9DfdC57E"
 * })
 * // 'obliques.base.eth'
 */

export async function getBasename({
  address,
}: Pick<GetBasenameParameters, "address">): Promise<GetBasenameReturnType> {
  const client = getPublicClient(base);
  const addressReverseNode = convertReverseNodeToBytes(address, base);

  const basename = await client.readContract({
    abi: L2ResolverAbi,
    address: RESOLVER_ADDRESS,
    functionName: "name",
    args: [addressReverseNode],
  });
  if (basename) return basename;
  return null;
}
