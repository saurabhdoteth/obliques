import { http, createPublicClient } from "viem";
import type { Chain } from "viem/chains";

export function getPublicClient(chain: Chain) {
  return createPublicClient({
    chain,
    transport: http(),
  });
}
