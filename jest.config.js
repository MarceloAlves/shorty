module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/cypress/'],
  moduleNameMapper: {
    '@components/(.*)': '<rootDir>/components/$1',
    '@lib/(.*)': '<rootDir>/lib/$1',
    '@machines/(.*)': '<rootDir>/machines/$1',
    '@providers/(.*)': '<rootDir>/providers/$1',
    '@services/(.*)': '<rootDir>/services/$1',
    '@schemas/(.*)': '<rootDir>/schemas/$1',
    '@utils/(.*)': '<rootDir>/utils/$1',
  },
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
}
