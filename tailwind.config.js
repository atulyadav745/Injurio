/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    colors: {
			berry: '#37AEB8',
			blush: '#F1E9EE',
			black: '#000000',
			mauve: '#063E42',
			white: '#FFFFFF',
			darkwhite: '#f9fafb',
			darkwhite2: '#f3f4f6',
			darkwhite3: '#e5e7eb',
			gray: '#808080',
			'pearly purple': '#AD6EA1',
		},
  },
  plugins: [],
}