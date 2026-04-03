import { i18nEn } from './i18n-en'
import { i18nZh } from './i18n-zh'
import type { Translations } from './i18n'

let _i18n: Translations = i18nZh

export function fallbackToEn() {
  _i18n = i18nEn
}

export function getI18n(): Translations {
  return _i18n
}
