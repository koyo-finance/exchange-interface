module.exports = {
	mode: 'jit',
	purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}', './node_modules/tw-elements/dist/js/**/*.js'],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		container: {
			center: true
		},
		extend: {
			colors: {
				...require('daisyui/colors'),
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
	variants: {
		extend: {}
	},
	plugins: [require('daisyui'), require('tw-elements/dist/plugin')]
};
