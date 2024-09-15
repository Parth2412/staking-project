module.exports = {
	env: {
		es2021: true,
		mocha: true,
		node: true,
	},
	extends: [
		'standard',
		'plugin:prettier/recommended',
		'plugin:node/recommended',
	],
	parserOptions: {
		ecmaVersion: 'latest',
	},
	overrides: [
		{
			files: ['src/*.js'],
			globals: { task: true },
		},
	],
};
