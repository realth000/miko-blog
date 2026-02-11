export function escapeSingleQuote(input: string): string {
  return input.replaceAll(String.raw`'`, String.raw`\'`)
}