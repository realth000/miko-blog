declare module '@mdx-js/mdx' {
  export async function evaluate(
    source: string,
    options?: Record<string, unknown>
  ): { default: Promise<React.ComponentType> }

  export function evaluateSync(
    source: string,
    options?: Record<string, unknown>
  ): { default: React.ComponentType }
}