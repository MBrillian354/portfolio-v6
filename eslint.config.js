import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import { defineConfig, globalIgnores } from "eslint/config";

const sourceFiles = ["**/*.{js,jsx}"];

const elevateRuleSeverity = (ruleValue) => {
	if (ruleValue === "warn") {
		return "error";
	}

	if (ruleValue === 1) {
		return 2;
	}

	if (Array.isArray(ruleValue) && ruleValue.length > 0) {
		const [severity, ...options] = ruleValue;

		if (severity === "warn") {
			return ["error", ...options];
		}

		if (severity === 1) {
			return [2, ...options];
		}
	}

	return ruleValue;
};

const elevateConfigWarnings = (config) => {
	if (!config?.rules) {
		return config;
	}

	return {
		...config,
		rules: Object.fromEntries(
			Object.entries(config.rules).map(([ruleName, ruleValue]) => [
				ruleName,
				elevateRuleSeverity(ruleValue)
			])
		)
	};
};

// Warnings are promoted to errors so a plain `eslint` run agrees with `--max-warnings=0`.
const strict = (config) => ({
	...elevateConfigWarnings(config),
	files: sourceFiles
});

export default defineConfig([
	globalIgnores(["dist"]),
	strict(js.configs.recommended),
	strict(reactHooks.configs["recommended-latest"]),
	strict(reactRefresh.configs.vite),
	// Must stay last so eslint-config-prettier can switch off conflicting rules.
	strict(prettierRecommended),
	{
		files: sourceFiles,
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			parserOptions: {
				ecmaVersion: "latest",
				ecmaFeatures: { jsx: true },
				sourceType: "module"
			}
		},
		rules: { "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }] }
	}
]);
