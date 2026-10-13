import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {ignores:['.next/**','next-env.d.ts','node_modules/**']},
  {files:['**/*.{ts,tsx}'],rules:{'@typescript-eslint/no-explicit-any':'warn'}},
  {files:['scripts/**/*.mjs'],languageOptions:{globals:{process:'readonly',console:'readonly'}}},
);
