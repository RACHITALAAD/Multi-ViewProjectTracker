export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        priority: {
          critical: '#dc2626',
          high: '#f87171',
          medium: '#fbbf24',
          low: '#86efac'
        }
      }
    }
  },
  plugins: [],
}