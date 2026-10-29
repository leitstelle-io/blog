/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.vue',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './content/**/*.md',
  ],
  theme: {
    extend: {
      colors: {
        night: {
          DEFAULT: 'rgb(var(--night-rgb) / <alpha-value>)',
          2: 'rgb(var(--night-2-rgb) / <alpha-value>)',
          3: 'rgb(var(--night-3-rgb) / <alpha-value>)',
        },
        ink: 'rgb(var(--ink-rgb) / <alpha-value>)',
        muted: 'rgb(var(--muted-rgb) / <alpha-value>)',
        brand: {
          DEFAULT: 'rgb(var(--brand-rgb) / <alpha-value>)',
          hi: 'rgb(var(--brand-hi-rgb) / <alpha-value>)',
          lo: 'rgb(var(--brand-lo-rgb) / <alpha-value>)',
        },
        amber: {
          DEFAULT: 'rgb(var(--amber-rgb) / <alpha-value>)',
          hi: 'rgb(var(--amber-hi-rgb) / <alpha-value>)',
          lo: 'rgb(var(--amber-lo-rgb) / <alpha-value>)',
        },
        beacon: {
          DEFAULT: 'rgb(var(--beacon-rgb) / <alpha-value>)',
          soft: 'rgb(var(--beacon-soft-rgb) / <alpha-value>)',
        },
        alarm: 'rgb(var(--alarm-rgb) / <alpha-value>)',
        select: 'rgb(var(--select-rgb) / <alpha-value>)',
      },
      fontFamily: {
        pixel: ['"Pixelify Sans"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '2xs': '.6875rem',
      },
      typography: {
        night: {
          css: {
            '--tw-prose-body': 'rgb(var(--ink-rgb) / <alpha-value>)',
            '--tw-prose-headings': 'rgb(var(--ink-rgb) / <alpha-value>)',
            '--tw-prose-lead': 'rgb(var(--muted-rgb) / <alpha-value>)',
            '--tw-prose-links': 'rgb(var(--amber-rgb) / <alpha-value>)',
            '--tw-prose-bold': 'rgb(var(--ink-rgb) / <alpha-value>)',
            '--tw-prose-counters': 'rgb(var(--muted-rgb) / <alpha-value>)',
            '--tw-prose-bullets': 'rgb(var(--amber-rgb) / <alpha-value>)',
            '--tw-prose-hr': 'var(--bevel-hi)',
            '--tw-prose-quotes': 'rgb(var(--ink-rgb) / <alpha-value>)',
            '--tw-prose-quote-borders': 'rgb(var(--brand-rgb) / <alpha-value>)',
            '--tw-prose-captions': 'rgb(var(--muted-rgb) / <alpha-value>)',
            '--tw-prose-code': 'rgb(var(--amber-hi-rgb) / <alpha-value>)',
            '--tw-prose-pre-code': 'rgb(var(--ink-rgb) / <alpha-value>)',
            '--tw-prose-pre-bg': 'var(--bevel-lo)',
            '--tw-prose-th-borders': 'var(--bevel-hi)',
            '--tw-prose-td-borders': 'rgb(var(--night-3-rgb) / <alpha-value>)',
            'h1, h2, h3, h4': {
              fontFamily: '"Pixelify Sans", ui-monospace, monospace',
              fontWeight: '600',
            },
            a: {
              textDecorationColor: 'rgb(var(--amber-lo-rgb) / <alpha-value>)',
              textUnderlineOffset: '3px',
            },
            'a:hover': {
              color: 'rgb(var(--amber-hi-rgb) / <alpha-value>)',
            },
            'h1 a, h2 a, h3 a, h4 a': {
              color: 'inherit',
              textDecoration: 'none',
            },
            code: {
              fontWeight: '500',
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            img: {
              border: '2px solid var(--bevel-hi)',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
