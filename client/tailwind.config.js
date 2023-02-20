/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js}", "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"],
	theme: {
		extend: {
			transitionProperty: {
				bg: "background",
			},
		},
	},
	plugins: [],
	darkMode: "class",
}
