/** @type {import('jest').Config} */
const config = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    moduleNameMapper: {
        // Mock CSS/SCSS modules to prevent errors
        "\\.(css|scss|sass)$": "identity-obj-proxy",
        // Handle absolute imports (as per `tsconfig.json` paths)
        "^@/components/(.*)$": "<rootDir>/components/$1",
        "^@/pages/(.*)$": "<rootDir>/pages/$1",
        "^@/context/(.*)$": "<rootDir>/context/$1",
    },
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
};

export default config;
