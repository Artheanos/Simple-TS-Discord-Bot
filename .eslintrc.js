module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
        'jest',
    ],
    rules: {
        '@typescript-eslint/no-extra-parens': 'error',
        'comma-dangle': ['error', 'always-multiline'],
        'indent': ['error', 4],
        'keyword-spacing': ['error', { 'before': true }],
        'object-curly-spacing': ['error', 'always'],
        'prefer-const': 'error',
        'quotes': ['error', 'single'],
        'semi': ['error', 'never'],
        'space-before-function-paren': ['error', {
            'anonymous': 'always',
            'asyncArrow': 'always',
            'named': 'never',
        }],
    },
}
