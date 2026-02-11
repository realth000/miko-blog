export function purifyUrl(path: string): string {
  const p1 = path.replaceAll(/\/(\/)+/g, '/')
  if (p1.endsWith('/')) {
    return p1.slice(0, -1)
  }

  return p1
}

export function hashObject(obj: unknown): string {
  const seen = new Set()
  const data = JSON.stringify(obj, (_, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        // Stop here as we meet a circular reference.
        return ''
      }
      seen.add(value)
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return value
  })

  return hash(data)
}

/**
 * ref: https://gist.github.com/iperelivskiy/4110988
 */
function hash(s: string): string {
  /* Simple hash function. */
  let a = 1, c = 0, h, o
  a = 0
  for (h = s.length - 1; h >= 0; h--) {
    o = s.codePointAt(h) ?? 0
    a = (a << 6 & 268_435_455) + o + (o << 14)
    c = a & 266_338_304
    a = c === 0 ? a : a ^ c >> 21
  }
  return String(a)
};
