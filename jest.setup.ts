import "@babel/polyfill";
import "@testing-library/jest-dom/extend-expect";

Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

Object.defineProperty(window, "location", {
    value: {
        protocol: "https",
        host: "host",
        href: "mockURl",
        pathname: "pathname",
        hash: "",
        assign: jest.fn(),
    },
    configurable: true,
});
