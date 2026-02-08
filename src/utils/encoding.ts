export function purifyUrl(path: string): string {
  const p1 = path.replaceAll(/\/(\/)+/g, '/')
  if (p1.endsWith('/')) {
    return p1.slice(0, -1)
  }

  return p1
}
