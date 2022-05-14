module.exports = {
    collectCoverage: true,
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
