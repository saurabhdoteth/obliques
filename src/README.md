# Obliques

Identity Interface for Onchain Namespaces

## Features

- **Multi-Namespace Resolution**: Resolve identities across multiple namespaces (ENS, Base) in a single call
- **Type-Safe API**: Built with TypeScript for complete type safety and excellent developer experience
- **Viem Integration**: Seamless integration with viem for reliable blockchain interactions
- **Modular Architecture**: Easy to extend with new namespace resolvers
- **Error Resilient**: Graceful error handling for failed resolutions without breaking the chain

## Overview

Obliques is a robust identity interface designed for onchain namespaces. It provides a seamless way to interact with and manage onchain identities, ensuring compatibility and ease of use.

```typescript
import { getNames } from 'obliques';

// Basic usage
const names = await getNames({
  address: '0xC79E675A8Dd11fBEc7Ea1042efB6686C9DfdC57E',
  namespaces: ['ens', 'base', 'cyber'],
});
// {
//   ens: 'obliques.eth',
//   base: 'obliques.base.eth',
//   cyber: 'obliques.cyber' // or null if not registered
// }

// Advanced: Using custom RPC clients for specific namespaces
import { createPublicClient, http } from 'viem';
import { mainnet, base, cyber } from 'viem/chains';

const customEnsClient = createPublicClient({
  chain: mainnet,
  transport: http('https://my.custom.ens.rpc'),
});
const customBaseClient = createPublicClient({
  chain: base,
  transport: http('https://my.custom.base.rpc'),
});
const customCyberClient = createPublicClient({
  chain: cyber,
  transport: http('https://my.custom.cyber.rpc'),
});

const namesWithCustomClients = await getNames({
  address: '0xC79E675A8Dd11fBEc7Ea1042efB6686C9DfdC57E',
  namespaces: ['ens', 'base', 'cyber'],
  config: {
    ens: { client: customEnsClient },
    base: { client: customBaseClient },
    cyber: { client: customCyberClient },
  },
});
// {
//   ens: 'obliques.eth',
//   base: 'obliques.base.eth',
//   cyber: 'obliques.cyber'
// }
```

### Supported Namespaces

- **ens**: Ethereum Name Service on Ethereum Mainnet
- **base**: Base Name Service on Base Network
- **cyber**: Cyber Name Service on Cyber Network

### Custom RPC Support

You can specify a custom RPC endpoint for any namespace by providing a custom `client` in the `config` object. This is useful for advanced use-cases, such as using private or geo-optimized RPCs.



### Supported Namespaces

- **ens**: Ethereum Name Service on Ethereum Mainnet
- **basename**: Base Name Service on Base Network

## Contributing

We welcome contributions from the community! If you're interested in contributing, please read the [contributing docs](/.github/CONTRIBUTING.md) before submitting a pull request.

## Authors

- [@saurabhdoteth](https://github.com/saurabhdoteth) (X: [@saurabhdoteth](https://x.com/saurabhdoteth))

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.