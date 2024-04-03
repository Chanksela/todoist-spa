/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"primary-green": "#41B883",
				"secondary-green": "#34495E",
				"primary-red": "#EF2D20",
				"secondary-red": "#F3F4F6",
				"accent-red": "#1F2937",
			},
		},
	},
	plugins: [],
};
