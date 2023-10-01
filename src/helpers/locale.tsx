export default function getLocale() {
  const localeName = navigator.language;
  const locales = navigator.languages;
  const locale = locales.find((lang) => lang.startsWith(`${localeName}-`)) || 'ru-RU';

  return locale;
}
