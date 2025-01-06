import type { Address } from "viem";
import { getPublicClient } from "../../utils/getPublicClient.js";
import { cyber } from "viem/chains";
import { convertReverseNodeToBytes } from "../../utils/convertReverseNodeToBytes.js";
import CyberPublicResolverAbi from "./abis/CyberPublicResolverAbi.js";

type GetCyberIdParameters = {
  address: Address;
};

type GetCyberIdReturnType = string | null;

const RESOLVER_ADDRESS = "0xfb2f304c1fcd6b053ee033c03293616d5121944b";

/**
 * Resolves an address to cyber id. Only works with cyber mainnet.
 *
 * @param {GetCyberIdParameters} params - Object containing address to resolve
 * @returns {Promise<GetCyberIdReturnType>} The cyber id or null if not found
 * @example
 * const name = await getCyberName({
 *   address: "0xC79E675A8Dd11fBEc7Ea1042efB6686C9DfdC57E"
 * })
 * // 'obliques.cyber'
 */

export async function getCyberName({
  address,
}: Pick<GetCyberIdParameters, "address">): Promise<GetCyberIdReturnType> {
  const client = getPublicClient(cyber);
  const addressReverseNode = convertReverseNodeToBytes(address, cyber);

  const cyberId = await client.readContract({
    abi: CyberPublicResolverAbi,
    address: RESOLVER_ADDRESS,
    functionName: "name",
    args: [addressReverseNode],
  });
  if (cyberId) return cyberId;
  return null;
}
