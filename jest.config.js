module.exports = {
    coverageThreshold: {
        global: {
            branch: 77,
        },
    },
    collectCoverageFrom: [
        "**/*.{ts,tsx}",
        "!**/index.{ts,tsx}",
        "!src/core/services/analyticsService.ts",
        "!src/App.tsx",
    ],
    preset: "@rubicon/jest-preset",
    testPathIgnorePatterns: ["<rootDir>/src/core/utils/test.tsx"],
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts", "jest-canvas-mock"],
};
