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
