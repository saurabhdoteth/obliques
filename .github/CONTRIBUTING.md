# Contributing

Thank you for your interest in contributing to Obliques! This document provides guidelines and best practices for contributing.

## Types of Contributions

### 1. Adding a New Resolver

A resolver is a module that handles name resolution for a specific namespace. To add a new resolver:

1. Create a new directory under `src/resolvers/{namespace}`
2. Implement the resolver following this structure:
   ```typescript
   import type { Address } from 'viem'

   type Get{Namespace}Parameters = {
     address: Address;
   };

   type Get{Namespace}ReturnType = string | null;

   export async function get{Namespace}({
     address
   }: Get{Namespace}Parameters): Promise<Get{Namespace}ReturnType> {
     const client = getPublicClient(chain)
     try {
       // Implementation
       return name
     } catch (error) {
       console.error(`Error fetching ${namespace} name:`, error)
       return null
     }
   }
   ```
3. Add necessary ABIs in `src/resolvers/{namespace}/abis/` if required
4. Update `src/actions/getNames.ts` to include the new namespace:
   ```typescript
   export type Namespace = 'ens' | 'basename' | 'your-namespace'

   const resolvers = {
     ens: getEnsName,
     basename: getBasename,
     'your-namespace': getYourNamespace,
   }
   ```
5. Add tests for the new resolver
6. Update documentation in README.md

### 2. Adding Features

When adding new features:

1. First discuss the feature through an issue
2. Follow the existing code structure:
   - Actions in `src/actions/`
   - Resolvers in `src/resolvers/{namespace}/`
   - Utilities in `src/utils/`
3. Maintain type safety with TypeScript
4. Add comprehensive tests
5. Update documentation

### 3. Bug Fixes

For bug fixes:

1. Create an issue describing the bug
2. Include steps to reproduce
3. Reference the issue in your PR
4. Add tests that would have caught the bug

## Best Practices

### Code Style

- Use TypeScript for all new code
- Follow functional programming principles
- Use descriptive variable names
- Keep functions small and focused
- Add JSDoc comments for public APIs

### Type Safety

```typescript
// ✅ Good
import type { Address } from 'viem'

type Parameters = {
  address: Address;
  chain?: Chain;
};

// ❌ Avoid
type Parameters = {
  address: string;
  chain: any;
};
```

### Error Handling

```typescript
// ✅ Good
try {
  const name = await client.readContract({
    address: RESOLVER_ADDRESS,
    abi: ResolverAbi,
    functionName: 'name',
    args: [node]
  })
  return name || null
} catch (error) {
  console.error('Error fetching name:', error)
  return null
}

// ❌ Avoid
const name = await client.readContract({
  address: RESOLVER_ADDRESS,
  abi: ResolverAbi,
  functionName: 'name',
  args: [node]
})
return name
```

### Testing

- Write unit tests for all new code
- Test edge cases and error conditions
- Use meaningful test descriptions
- Mock external dependencies (Viem clients, contract calls)

## Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Commit your changes with clear messages
4. Push to your fork
5. Submit a PR with:
   - Clear description of changes
   - Screenshots if applicable
   - Reference to related issues

## Development Setup

1. Clone the repository
2. Install dependencies: `bun install`
3. Run tests: `bun test`
4. Build: `bun run build`

## Questions?

Feel free to open an issue for any questions or concerns.
