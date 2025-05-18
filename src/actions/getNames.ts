import { getEnsName } from "../resolvers/ens/getEnsName.js";
import { getBaseName } from "../resolvers/basename/getBasename.js";
import type { Address, PublicClient } from "viem";
import { getCyberName } from "../resolvers/cyber/getCyberName.js";

export type Namespace = "ens" | "base" | "cyber";
export type NamespaceConfig = { client?: PublicClient };
export type GetNamesConfig = Partial<Record<Namespace, NamespaceConfig>>;
export type GetNameParameters = {
  address: Address;
  namespaces: Namespace[];
  config?: GetNamesConfig;
};
export type GetNameReturnType = { [K in Namespace]: string | null };

const resolvers: Record<
  Namespace,
  (params: {
    address: Address;
    config?: { client?: PublicClient };
  }) => Promise<string | null>
> = {
  ens: getEnsName,
  base: getBaseName,
  cyber: getCyberName,
};

/**
 * Retrieves names for the specified namespaces based on the provided address.
 *
 * @param {GetNameParameters} params - Object containing the address and selected namespaces.
 * @returns {Promise<GetNameReturnType>} An object with the resolved names for each namespace.
 *
 * @example
 * // Basic usage
 * const names = await getNames({
 *   address: '0xC79E675A8Dd11fBEc7Ea1042efB6686C9DfdC57E',
 *   namespaces: ['ens', 'base']
 * });
 * // { ens: 'obliques.eth', base: 'obliques.base.eth', cyber: null }
 *
 * // With custom clients (e.g., for custom RPCs)
 * import { createPublicClient, http } from 'viem';
 * import { mainnet, base } from 'viem/chains';
 *
 * const customEnsClient = createPublicClient({ chain: mainnet, transport: http('https://my.custom.ens.rpc') });
 * const customBaseClient = createPublicClient({ chain: base, transport: http('https://my.custom.base.rpc') });
 *
 * const namesWithCustomClients = await getNames({
 *   address: '0xC79E675A8Dd11fBEc7Ea1042efB6686C9DfdC57E',
 *   namespaces: ['ens', 'base'],
 *   config: {
 *     ens: { client: customEnsClient },
 *     base: { client: customBaseClient },
 *   }
 * });
 * // { ens: 'obliques.eth', base: 'obliques.base.eth', cyber: null }
 */
export async function getNames({
  address,
  namespaces,
  config = {},
}: GetNameParameters): Promise<GetNameReturnType> {
  const result: GetNameReturnType = {
    ens: null,
    base: null,
    cyber: null,
  };

  await Promise.all(
    namespaces.map(async (namespace) => {
      try {
        const name = await resolvers[namespace]({
          address,
          config: config[namespace] ?? {},
        });
        if (name) {
          result[namespace] = name;
        }
      } catch {}
    })
  );

  return result;
}
