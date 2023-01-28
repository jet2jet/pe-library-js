module.exports = {
	preset: 'ts-jest',
	clearMocks: true,
	testEnvironment: 'node',
	testMatch: ['<rootDir>/src/test/basic/**/*.ts'],
	moduleNameMapper: {
		'^@/(.*)\\.js$': '<rootDir>/src/main/$1',
		'^@/(.*)$': '<rootDir>/src/main/$1',
		'(.+)\\.js': '$1',
	},
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.test.json',
		},
	},
};
