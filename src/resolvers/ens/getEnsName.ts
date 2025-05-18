import type {
  GetEnsNameParameters,
  GetEnsNameReturnType,
  PublicClient,
} from "viem";
import { getPublicClient } from "../../utils/getPublicClient.js";
import { mainnet } from "viem/chains";

/**
 * Reuses viem's getEnsName function to resolve ENS names.
 * Only works with ethereum mainnet.
 * @see https://viem.sh/docs/ens/actions/getEnsName
 */

export type EnsResolverConfig = { client?: PublicClient };

export async function getEnsName({
  address,
  config,
}: Pick<GetEnsNameParameters, "address"> & {
  config?: EnsResolverConfig;
}): Promise<GetEnsNameReturnType> {
  const _client = config?.client ?? getPublicClient(mainnet);
  return _client.getEnsName({ address });
}
