/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js}", "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"],
	theme: {
		extend: {
			transitionProperty: {
				bg: "background",
			},
			colors: {
				primary: "#292D36",
				secondary: "#EF8354",
				accent: "#5E6572",
				background: "#0F0F0F",
				text: "#F5F5F5",
				button: "#4DA6FF",
				popup: "#161C28",
			},
		},
	},
	plugins: [],
	darkMode: "class",
}
