import "@testing-library/jest-dom/extend-expect";

// Mock `next/router` to prevent navigation errors
jest.mock("next/router", () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        pathname: "/",
        query: {},
        asPath: "/",
    }),
}));


