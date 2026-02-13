/**
 * Ambient module declaration for the optional @opencode-ai/sdk dependency.
 * The SDK is loaded dynamically at runtime; this declaration satisfies tsc.
 */
declare module "@opencode-ai/sdk" {
  export function createOpencodeClient(options: {
    baseUrl: string;
    [key: string]: unknown;
  }): any;
}
