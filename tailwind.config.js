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
					100: '#FFFB8E',
					200: '#FFD26B',
					300: '#FFB750',
					400: '#F0932C',
					500: '#D87B14',
					600: '#BA5D00'
				},
				darks: {
					100: '#D58A9F',
					200: '#AF86A8',
					300: '#805779',
					400: '#532A4C',
					500: '#300729',
					600: '#1D0016'
				}
			},
			lineHeight: {
				'48px': '48px'
			},
			fontFamily: {
				sora: ["'Sora'", 'sans-serif'],
				inter: ["'Inter'", 'sans-serif'],
				jtm: ['JetBrains Mono', 'monospace']
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
			animation: {
				'fade-in': 'fade-in 800 linear'
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
