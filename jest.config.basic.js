module.exports = {
	preset: 'ts-jest',
	clearMocks: true,
	testEnvironment: 'node',
	testMatch: ['<rootDir>/src/test/basic/**/*.ts'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/main/$1',
	},
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.test.json',
		},
	},
};
