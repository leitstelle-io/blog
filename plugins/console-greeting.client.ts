export default defineNuxtPlugin((nuxtApp) => {
  const en = (nuxtApp.$i18n as {locale?: {value: string}} | undefined)?.locale?.value === 'en'
  const text = en
    ? ' Curious? Found a bug or want to help out: https://forum.leitstelle.io'
    : ' Neugierig? Fehler gefunden oder Lust mitzuhelfen: https://forum.leitstelle.io'
  console.info(
    `%cLeitstelle%c${text}`,
    'background:#12122a;color:#e08a1e;font-family:ui-monospace,monospace;font-weight:bold;padding:2px 6px',
    '',
  )
})
