import angular from '@angular-eslint/eslint-plugin';
import angularTemplate from '@angular-eslint/eslint-plugin-template';
import parserAngular from '@angular-eslint/template-parser';
import tseslint from '@typescript-eslint/eslint-plugin';
import parserTypescript from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: parserTypescript,
      parserOptions: {
        project: './tsconfig.json'
      },
      globals: globals.browser
    },
    plugins: {
      '@angular-eslint': angular,
      '@typescript-eslint': tseslint,
      unicorn
    },
    rules: {
      ...angular.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...unicorn.configs.recommended.rules, 
       // Кастомизация правил
      'unicorn/filename-case': [
        'error',
        { 
          cases: {
            kebabCase: true,    // my-component.ts
            pascalCase: true     // AppComponent.ts
          },
          ignore: ['\\.spec\\.ts$'] // Игнорируем тесты
        }
      ],
      'unicorn/prevent-abbreviations': 'off', // Отключаем для Angular
      'unicorn/no-null': 'off', // Разрешаем null
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' }
      ]
    }
  },
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: parserAngular
    },
    plugins: {
      '@angular-eslint/template': angularTemplate
    }
  },
  prettier,
  {
    ignores: ['dist/**', 'node_modules/**']
  }
];