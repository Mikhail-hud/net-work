import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import AutoImport from "unplugin-auto-import/vite";
import visualizer from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => {
    const isProduction: boolean = mode === "production";
    return {
        plugins: [
            react(),
            AutoImport({
                imports: [
                    "react",
                    "react-router-dom",
                    {
                        vitest: ["describe", "it", "expect", "test", "vi", "beforeEach"],
                    },
                ], // Automatically import hooks and utilities
                dts: "./auto-imports.d.ts", // Generate TypeScript declaration file
                eslintrc: {
                    enabled: true, // Enable ESLint configuration generation
                    filepath: "./.eslintrc-auto-import.json", // Path to the ESLint configuration file
                    globalsPropValue: true, // Use "true" for global properties
                },
            }),
            isProduction && visualizer({ filename: "./dist/stats.html", open: true, template: "flamegraph" }),
        ],
        //"flamegraph"//
        resolve: {
            alias: {
                "@app": path.resolve(__dirname, "src"),
                "@hooks": path.resolve(__dirname, "src/hooks"),
                "@pages": path.resolve(__dirname, "src/pages"),
                "@components": path.resolve(__dirname, "src/components"),
                "@assets": path.resolve(__dirname, "src/assets"),
                "@constants": path.resolve(__dirname, "src/constants"),
                "@helpers": path.resolve(__dirname, "src/helpers"),
            },
        },
        server: { port: 3000, hmr: true, open: true },
        preview: { port: 9000, strictPort: true, open: true },
        build: {
            outDir: "dist",
            sourcemap: !isProduction,
        },
        test: {
            globals: true,
            environment: "jsdom",
            setupFiles: "./setup-vitest.ts",
            coverage: {
                provider: "v8",
                enabled: true,
                // thresholds: { statements: 80, branches: 80, functions: 80, lines: 80 },
                exclude: ["src/**/index.tsx", "src/**/index.ts", "setup-vitest.ts"],
                reporter: ["lcov", "text"],
            },
            reporters: ["default", ["vitest-sonar-reporter", { outputFile: "coverage/sonar.xml" }]],
        },
    };
});
