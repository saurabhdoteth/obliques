import { getEnsName } from "../resolvers/ens/getEnsName.js";
import { getBasename } from "../resolvers/basename/getBasename.js";
import type { Address } from "viem";
import { getCyberName } from "../resolvers/cyber/getCyberName.js";

export type Namespace = "ens" | "basename" | "cyber";

export type GetNameParameters = {
  address: Address;
  namespaces: Namespace[];
};

export type GetNameReturnType = { [K in Namespace]: string | null };

const resolvers: Record<
  Namespace,
  (params: Pick<GetNameParameters, "address">) => Promise<string | null>
> = {
  ens: getEnsName,
  basename: getBasename,
  cyber: getCyberName,
};

/**
 * Retrieves names for the specified namespaces based on the provided address.
 *
 * @param {GetNameParameters} params - Object containing the address and selected namespaces.
 * @returns {Promise<GetNameReturnType>} An object with the resolved names for each namespace.
 *
 * @example
 * const names = await getNames({
 *   address: '0xC79E675A8Dd11fBEc7Ea1042efB6686C9DfdC57E',
 *   namespaces: ['ens', 'basename']
 * })
 * // { ens: 'obliques.eth', basename: obliques.base.eth }
 */
export async function getNames({
  address,
  namespaces,
}: GetNameParameters): Promise<GetNameReturnType> {
  const result: GetNameReturnType = {
    ens: null,
    basename: null,
    cyber: null,
  };

  await Promise.all(
    namespaces.map(async (namespace) => {
      try {
        const name = await resolvers[namespace]({ address });
        if (name) {
          result[namespace] = name;
        }
      } catch {}
    })
  );

  return result;
}
