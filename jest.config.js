module.exports = {
    // preset: '@shelf/jest-mongodb',
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{js,jsx}',
        '!src/**/node_modules/**',
    ],
    automock: true,
};