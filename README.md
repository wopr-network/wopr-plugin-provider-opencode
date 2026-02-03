# wopr-plugin-provider-opencode

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![WOPR](https://img.shields.io/badge/WOPR-Plugin-blue)](https://github.com/TSavo/wopr)
[![Version](https://img.shields.io/badge/version-1.1.0-green)](https://github.com/TSavo/wopr-plugin-provider-opencode-github)

OpenCode AI provider plugin for [WOPR](https://github.com/TSavo/wopr) with A2A/MCP support.

> Part of the [WOPR](https://github.com/TSavo/wopr) ecosystem - Self-sovereign AI session management over P2P.

## Features

- OpenCode SDK integration for AI coding tasks
- A2A (Agent-to-Agent) tools via MCP server configuration
- Session management with resumption support
- Image handling in prompts
- Streaming responses
- Configurable UI schema for WOPR settings

## Installation

```bash
wopr plugin install wopr-plugin-provider-opencode
```

## Prerequisites

### OpenCode Server

The OpenCode server must be running. Install and start it:

```bash
npm install -g @opencode-ai/cli
opencode server
```

### OpenCode SDK

The plugin uses `@opencode-ai/sdk` which is included as a dependency. It will be installed automatically.

## Configuration

### Via WOPR CLI

Set the OpenCode server URL (default: `http://localhost:4096`):

```bash
wopr providers add opencode http://localhost:4096
```

### Configuration Schema

The plugin registers a configuration schema with the following fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `serverUrl` | text | `http://localhost:4096` | OpenCode server URL (must be running) |
| `model` | select | `claude-3-5-sonnet` | Default model to use for new sessions |

## Usage

### Create a Session

```bash
wopr session create my-session --provider opencode
```

### Set Provider on Existing Session

```bash
wopr session set-provider my-session opencode
```

### Health Check

The plugin validates the connection by checking the OpenCode server health endpoint. If the server is not running during credential validation, the plugin will still allow configuration (assuming the server will be started later).

## Supported Models

All models use the Anthropic provider by default:

| Model | Description |
|-------|-------------|
| `claude-3-5-sonnet` | Default model - Claude 3.5 Sonnet |
| `claude-3-5-haiku` | Claude 3.5 Haiku - faster, lighter |
| `gpt-4o` | OpenAI GPT-4o |
| `gpt-4o-mini` | OpenAI GPT-4o Mini |

## A2A/MCP Integration

The plugin supports A2A (Agent-to-Agent) tools via MCP server configuration. When A2A servers are configured, tools are registered with the naming convention:

```
mcp__{serverName}__{toolName}
```

This allows WOPR sessions to leverage external MCP tools during AI interactions.

### Configuring A2A Tools

Pass A2A servers via the query options:

```typescript
{
  a2aServers: {
    "my-server": {
      name: "my-server",
      version: "1.0.0",
      tools: [
        {
          name: "my-tool",
          description: "Tool description",
          inputSchema: { /* JSON Schema */ },
          handler: async (args) => { /* handler */ }
        }
      ]
    }
  }
}
```

## Session Management

The plugin automatically creates and manages OpenCode sessions:

- Sessions are created on first query
- Session IDs are yielded for resumption support
- Sessions persist across multiple queries within the same client instance

## Image Support

Images can be included in prompts:

```typescript
{
  prompt: "What's in this image?",
  images: ["https://example.com/image.png"]
}
```

Images are formatted as references in the prompt text.

## Development

### Build

```bash
npm install
npm run build
```

### Dependencies

- `@opencode-ai/sdk` - OpenCode SDK for API communication
- `winston` - Logging

### Peer Dependencies

- `wopr` - WOPR core (must be installed in the host environment)

### TypeScript

The plugin is written in TypeScript targeting ES2022 with NodeNext module resolution.

## API Reference

### Provider Interface

| Property | Value |
|----------|-------|
| `id` | `opencode` |
| `name` | `OpenCode` |
| `description` | `OpenCode AI SDK with A2A/MCP support` |
| `defaultModel` | `claude-3-5-sonnet` |
| `credentialType` | `custom` |

### Client Methods

| Method | Description |
|--------|-------------|
| `query(options)` | Execute a prompt and stream responses |
| `listModels()` | Return supported model list |
| `healthCheck()` | Check OpenCode server health |

## About OpenCode

OpenCode is an open-source AI coding assistant.
Learn more: https://opencode.ai

## License

MIT
