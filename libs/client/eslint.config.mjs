import nx from '@nx/eslint-plugin';
import baseConfig from '../../eslint.base.config.mjs';

export default [
    ...baseConfig,
    {
        files: ['**/*.json'],
        rules: {
            '@nx/dependency-checks': [
                'error',
                {
                    ignoredFiles: ['{projectRoot}/eslint.config.{js,cjs,mjs,ts,cts,mts}']
                }
            ]
        },
        languageOptions: {
            parser: await import('jsonc-eslint-parser')
        }
    },
    ...nx.configs['flat/angular'],
    ...nx.configs['flat/angular-template'],
    {
        files: ['**/*.ts'],
        rules: {
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: 'lib',
                    style: 'camelCase'
                }
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: 'lib',
                    style: 'kebab-case'
                }
            ],
            "@angular-eslint/prefer-inject": 'off',
            "@angular-eslint/use-lifecycle-interface": "off",
            "@angular-eslint/component-selector": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "@typescript-eslint/no-empty-function": "off",
            "@typescript-eslint/no-unused-expressions": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-inferrable-types": "off",
        }
    },
    {
        files: ['**/*.html'],
        // Override or add rules here
        rules: {
            "@angular-eslint/template/elements-content": "off",
            "@angular-eslint/template/alt-text": "off",
            "@angular-eslint/template/interactive-supports-focus": "off",
            "@angular-eslint/template/click-events-have-key-events": "off",
        }
    },
    {
        rules: {
            "@nx/dependency-checks": "off",
        }
    },
];
