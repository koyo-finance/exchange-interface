module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		container: {
			center: true
		},
		extend: {
			colors: {
				chain: {
					ethereum: '#627eea',
					boba: '#d7fe44'
				},
				lights: {
					200: '#F9F3E5',
					300: '#D58A9F'
				},
				darks: {
					500: '#300729'
				}
			},
			fontSize: {
				xxs: '0.5rem'
			},
			fontFamily: {
				sora: ["'Sora'", 'sans-serif'],
				inter: ["'Inter'", 'sans-serif']
			}
		}
	},
	plugins: [require('daisyui'), require('tailwindcss-border-gradient-radius')]
};
