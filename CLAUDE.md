# wopr-plugin-provider-opencode

OpenCode AI provider plugin for WOPR.

## Commands

```bash
npm run build     # tsc
npm run check     # biome check + tsc --noEmit (run before committing)
npm run format    # biome format --write src/
npm test          # vitest run
```

## Key Details

- Implements `ProviderPlugin` from `@wopr-network/plugin-types`
- API key and endpoint configured via plugin config schema
- **Gotcha**: opencode is a code-focused model — not general chat. Best for coding-assist bots.

## Plugin Contract

Imports only from `@wopr-network/plugin-types`. Never import from `@wopr-network/wopr` core.

## Issue Tracking

All issues in **Linear** (team: WOPR). Issue descriptions start with `**Repo:** wopr-network/wopr-plugin-provider-opencode`.
