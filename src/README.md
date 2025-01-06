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
import { getNames } from 'obliques'

  const names = await getNames({
    address: '0xC79E675A8Dd11fBEc7Ea1042efB6686C9DfdC57E',
    namespaces: ['ens', 'basename']
  })

  // {
  //   ens: 'obliques.eth',
  //   basename: 'obliques.base.eth'
  // }
```

### Supported Namespaces

- **ens**: Ethereum Name Service on Ethereum Mainnet
- **basename**: Base Name Service on Base Network

## Contributing

We welcome contributions from the community! If you're interested in contributing, please read the [contributing docs](/.github/CONTRIBUTING.md) before submitting a pull request.

## Authors

- [@saurabhdoteth](https://github.com/saurabhdoteth) (X: [@saurabhdoteth](https://x.com/saurabhdoteth))

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.