export default {
	preset: 'ts-jest',
	clearMocks: true,
	testEnvironment: 'node',
	testMatch: ['<rootDir>/src/test/basic/**/*.ts'],
	moduleNameMapper: {
		'^@/(.*)\\.js$': '<rootDir>/src/main/$1',
		'^@/(.*)$': '<rootDir>/src/main/$1',
		'(.+)\\.js': '$1',
	},
	extensionsToTreatAsEsm: ['.ts'],
	transform: {
		'^.+\\.tsx?$': [
			'ts-jest',
			{
				tsconfig: 'tsconfig.test.json',
				useESM: true,
				diagnostics: {
					ignoreCodes: ['TS151001'],
				},
			},
		],
	},
};
