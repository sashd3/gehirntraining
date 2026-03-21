import { createI18n } from 'vue-i18n'
import de from './de'
import en from './en'
import be from './be'

export type MessageSchema = typeof de

const i18n = createI18n<[MessageSchema], 'de' | 'en' | 'be'>({
  legacy: false,
  locale: 'de',
  fallbackLocale: 'en',
  messages: {
    de,
    en,
    be,
  },
})

export default i18n
