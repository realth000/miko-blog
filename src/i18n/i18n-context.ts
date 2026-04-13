import { log } from '@/log'
import { i18nChs } from './i18n-chs'
import { i18nCht } from './i18n-cht'
import { i18nEn } from './i18n-en'
import type { Translations } from './i18n'

let _i18n: Translations = i18nChs

export function setupI18n() {
  const lang = navigator.language.toLowerCase()
  log('lang:', lang)
  if (lang.startsWith('zh-hans')) {
    _i18n = i18nChs
  } else if (lang.startsWith('zh-hant')) {
    _i18n = i18nCht
  } else {
    switch (lang) {
      case 'zh-cn':
      case 'zh-sg': {
        _i18n = i18nChs
        break
      }
      case 'zh-hk':
      case 'zh-tw':
      case 'zh-mo':
      case 'zh-hant': {
        _i18n = i18nCht
        break
      }
      default: {
        _i18n = i18nEn
        break
      }
    }
  }
}

export function setI18nToCht() {
  _i18n = i18nCht
}

export function getI18n(): Translations {
  return _i18n
}
