module.exports = {
	semi: true,
	singleQuote: false,
	jsxSingleQuote: false,
	trailingComma: "none",
	objectWrap: "collapse",
	printWidth: 80,
	tabWidth: 2,
	useTabs: true,
	bracketSpacing: true,
	arrowParens: "always",
	proseWrap: "preserve",
	plugins: ["prettier-plugin-tailwindcss"],
	tailwindStylesheet: "./src/index.css",
	tailwindFunctions: ["cn", "clsx", "classNames", "twMerge", "cva"],

	// set to "auto" to avoid issues with different OSes
	endOfLine: "auto"
};
