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
			lineHeight: {
				'48px': '48px'
			},
			fontFamily: {
				sora: ["'Sora'", 'sans-serif'],
				inter: ["'Inter'", 'sans-serif']
			},
			fontSize: {
				xxs: '0.5rem',
				hero: [
					'48px',
					{
						letterSpacing: '-0.02em;',
						lineHeight: '96px',
						fontWeight: 700
					}
				]
			},
			borderRadius: {
				none: '0',
				px: '1px',
				DEFAULT: '0.625rem'
			},
			screens: {
				'3xl': '1600px'
			}
		}
	},
	plugins: [require('daisyui'), require('tailwindcss-border-gradient-radius')]
};
