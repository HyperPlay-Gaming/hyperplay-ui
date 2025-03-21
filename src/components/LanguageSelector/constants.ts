export enum FLAG_POSITION {
  NONE = 'none',
  PREPEND = 'prepend',
  APPEND = 'append'
}

export const locales = [
  'de',
  'el',
  'en',
  'es',
  'fr',
  'mt',
  'fil',
  'it',
  'pl',
  'ro',
  'ja',
  'ko',
  'pt_BR',
  'ru',
  'uk',
  'vi',
  'zh_Hans'
] as const

export type SupportedLocale = (typeof locales)[number]

export const languageLabels: { [key in SupportedLocale]: string } = {
  de: 'Deutsch',
  el: 'Ελληνικά',
  en: 'English',
  es: 'Español',
  fr: 'Français',
  mt: 'Malti',
  fil: 'Tagalog',
  it: 'Italiano',
  pl: 'Polski',
  ro: 'Română',
  ja: '日本語',
  ko: '한국어',
  pt_BR: 'Português',
  ru: 'Русский',
  uk: 'Українська',
  vi: 'Tiếng Việt',
  zh_Hans: '简体中文'
}

export const languageFlags: { [key in SupportedLocale]: string } = {
  de: '🇩🇪',
  el: '🇬🇷',
  en: '🇬🇧',
  es: '🇪🇸',
  fr: '🇫🇷',
  mt: '🇲🇹',
  fil: '🇵🇭',
  it: '🇮🇹',
  pl: '🇵🇱',
  ro: '🇷🇴',
  ja: '🇯🇵',
  ko: '🇰🇷',
  pt_BR: '🇧🇷',
  ru: '🇷🇺',
  uk: '🇺🇦',
  vi: '🇻🇳',
  zh_Hans: '🇨🇳'
}
