import type { GetEnsNameParameters, GetEnsNameReturnType } from "viem";
import { getPublicClient } from "../../utils/getPublicClient.js";
import { mainnet } from "viem/chains";

/**
 * Reuses viem's getEnsName function to resolve ENS names.
 * Only works with ethereum mainnet.
 * @see https://viem.sh/docs/ens/actions/getEnsName
 */

export async function getEnsName({
  address,
}: Pick<GetEnsNameParameters, "address">): Promise<GetEnsNameReturnType> {
  const client = getPublicClient(mainnet);
  return client.getEnsName({ address });
}
