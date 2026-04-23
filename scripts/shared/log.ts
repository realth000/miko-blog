import { exit } from 'node:process'

export function log(...message: unknown[]) {
  console.log('[miko-blog]', ...message)
}

export function warn(...message: unknown[]) {
  console.log('[miko-blog] [warn]', ...message)
}

export function fatal(...message: unknown[]) {
  console.log('[miko-blog] [fatal]', ...message)
  exit(1)
}
