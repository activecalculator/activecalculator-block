/**
 * ESLint config: the @wordpress/scripts defaults, plus the fact that WordPress provides the @wordpress/*
 * packages at runtime (the build maps them to wp.* globals), so they aren't installed as dependencies.
 */
const defaultConfig = require( '@wordpress/scripts/config/eslint.config.cjs' );

module.exports = [
	...defaultConfig,
	{
		settings: {
			'import/core-modules': [
				'@wordpress/block-editor',
				'@wordpress/blocks',
				'@wordpress/components',
				'@wordpress/compose',
				'@wordpress/element',
				'@wordpress/i18n',
			],
		},
	},
	{
		// Unit tests run on Node's built-in test runner, not Vitest.
		files: [ '**/*.test.mjs' ],
		rules: {
			'vitest/no-import-node-test': 'off',
		},
	},
];
