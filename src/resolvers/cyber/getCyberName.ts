import type { Address } from "viem";
import { getPublicClient } from "../../utils/getPublicClient.js";
import { cyber } from "viem/chains";
import { convertReverseNodeToBytes } from "../../utils/convertReverseNodeToBytes.js";
import CyberPublicResolverAbi from "./abis/CyberPublicResolverAbi.js";

type GetCyberNameParameters = {
  address: Address;
};

type GetCyberNameReturnType = string | null;

const RESOLVER_ADDRESS = "0xfb2f304c1fcd6b053ee033c03293616d5121944b";

/**
 * Resolves an address to cyber id. Only works with cyber mainnet.
 *
 * @param {GetCyberNameParameters} params - Object containing address to resolve
 * @returns {Promise<GetCyberNameReturnType>} The cyber id or null if not found
 * @example
 * const name = await getCyberName({
 *   address: "0xC79E675A8Dd11fBEc7Ea1042efB6686C9DfdC57E"
 * })
 * // 'obliques.cyber'
 */

export async function getCyberName({
  address,
}: Pick<GetCyberNameParameters, "address">): Promise<GetCyberNameReturnType> {
  const client = getPublicClient(cyber);
  const addressReverseNode = convertReverseNodeToBytes(address, cyber);

  const name = await client.readContract({
    abi: CyberPublicResolverAbi,
    address: RESOLVER_ADDRESS,
    functionName: "name",
    args: [addressReverseNode],
  });
  if (name) return name;
  return null;
}
