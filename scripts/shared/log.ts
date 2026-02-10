import { exit } from 'node:process'

export function log(...message: unknown[]) {
  console.log('[miko-blog]', ...message)
}

export function fatal(...message: unknown[]) {
  console.log('[miko-blog] [fatal]', ...message)
  exit(1)
}