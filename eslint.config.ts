import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    // rules: {
    //     "@typescript-eslint/no-unused-vars": [
    //         "warn",
    //         {
    //             argsIgnorePattern: "^_",
    //             caughtErrorsIgnorePattern: "^_",
    //             varsIgnorePattern: "^_",
    //         },
    //     ],
    // },
  },
  {
    files: ['**/*.{js,cjs,mjs}'],
    extends: [tseslint.configs.disableTypeChecked],
  },
);
