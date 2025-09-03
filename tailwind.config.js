/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(220, 26%, 97%)',
        foreground: 'hsl(220, 14%, 20%)',
        accent: 'hsl(260, 87%, 61%)',
        primary: 'hsl(204, 94%, 58%)',
        surface: 'hsl(0, 0%, 100%)',
        'dark-bg': 'hsl(248, 48%, 12%)',
        'dark-surface': 'hsl(248, 40%, 16%)',
        'dark-border': 'hsl(248, 20%, 24%)',
      },
      borderRadius: {
        lg: '12px',
        md: '8px',
        sm: '4px',
      },
      spacing: {
        lg: '24px',
        md: '16px',
        sm: '8px',
      },
      boxShadow: {
        card: '0 4px 16px hsla(220, 14%, 20%, 0.08)',
      },
    },
  },
  plugins: [],
};
