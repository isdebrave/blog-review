import eslint from '@eslint/js';
import tseslint from "typescript-eslint";

const config = tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        languageOptions: {
            parserOptions: {
                "ecmaVersion": 'latest',
                "sourceType": "module",
                "project": "./tsconfig.json",
                "ecmaFeatures": { "jsx": true },
            },
        },
        ignores: ["dist/", "node_modules/"],
        rules: {}
    }
);

export default config;