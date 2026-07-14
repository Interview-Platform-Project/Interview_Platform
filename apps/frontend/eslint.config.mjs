import eslint from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // Глобальные игнорируемые пути
  {
    ignores: ['**/node_modules/**', '.next/**', 'out/**', 'dist/**', 'build/**', '**/*.d.ts'],
  },

  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  // Основной конфиг для всех файлов
  {
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      '@next/next': nextPlugin,
      import: importPlugin,
    },

    settings: {
      react: {
        version: 'detect',
      },
      // Настройка резолвера для поддержки алиасов (например, @/)
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },

    rules: {
      // -------- React --------
      'react/react-in-jsx-scope': 'off', // не требуется в Next.js
      'react/prop-types': 'off', // используем TypeScript
      'react/jsx-key': 'error',

      // -------- React Hooks --------
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // -------- Next.js --------
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'warn',
      '@next/next/no-sync-scripts': 'error',

      // -------- Импорты (порядок и дубли) --------
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/no-duplicates': 'error',
      'import/no-useless-path-segments': ['error', { noUselessIndex: true }],

      // -------- Feature-Sliced Design: ограничения между слоями --------
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            // entities может импортировать только shared
            { target: './src/entities', from: './src/features' },
            { target: './src/entities', from: './src/widgets' },
            { target: './src/entities', from: './src/pages' },
            { target: './src/entities', from: './src/app' },

            // features может импортировать entities + shared, но не выше
            { target: './src/features', from: './src/widgets' },
            { target: './src/features', from: './src/pages' },
            { target: './src/features', from: './src/app' },

            // widgets может импортировать features + entities + shared, но не pages/app
            { target: './src/widgets', from: './src/pages' },
            { target: './src/widgets', from: './src/app' },

            // pages может импортировать всё, кроме app
            { target: './src/pages', from: './src/app' },

            // shared не может импортировать ничего из других слоёв
            { target: './src/shared', from: './src/app' },
            { target: './src/shared', from: './src/pages' },
            { target: './src/shared', from: './src/widgets' },
            { target: './src/shared', from: './src/features' },
            { target: './src/shared', from: './src/entities' },
          ],
        },
      ],
    },
  },

  // -------- Переопределения для TypeScript --------
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  // -------- Переопределения для JavaScript --------
  {
    files: ['**/*.js', '**/*.jsx'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off', // разрешаем require в .js
    },
  },
);
