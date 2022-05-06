import { createI18n } from 'vue-i18n'

async function loadLocaleMessages() {
  const locales = import.meta.glob('./locales/*.json')
  const messages = {}
  for (const path in locales) {
    await locales[path]().then((mod) => {
      const locale = path.substring(10, path.length - 5);
      messages[locale] = mod.default;
    });
  }
  return messages
}

export default createI18n({
  legacy: false,
  globalInjection: true,
  locale: import.meta.env.VITE_VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: import.meta.env.VITE_VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: await loadLocaleMessages()
})
