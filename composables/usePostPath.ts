// Content paths carry the locale folder (/de/blog/...), routes carry it as an i18n prefix
export const usePostPath = () => {
  const localePath = useLocalePath()
  return (contentPath: string) => localePath(contentPath.replace(/^\/(de|en)(?=\/)/, ''))
}

export const useFormattedDate = () => {
  const {locale} = useI18n()
  return (date: string) => new Date(date).toLocaleDateString(locale.value === 'de' ? 'de-DE' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
