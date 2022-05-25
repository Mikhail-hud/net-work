module.exports = {
    collectCoverage: true,
    testEnvironment: "jsdom",
    coverageThreshold: {
        global: {
            statements: 75,
            branches: 75,
            functions: 75,
            lines: 75,
        },
    },
    moduleDirectories: ["node_modules", "src"],
};
