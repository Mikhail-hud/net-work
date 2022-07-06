import "whatwg-fetch";
import "@testing-library/jest-dom/extend-expect";
import { configure } from "@testing-library/dom";

configure({ testIdAttribute: "data-sdet" });

Object.defineProperty(window, "__config", {
    writable: true,
    // TODO: Add config variables that you want to use in your tests
    value: {},
});

// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

// For Ant Charts
global.URL.createObjectURL = jest.fn(() => "test");
class Worker {
    addEventListener;
    dispatchEvent;
    onerror;
    onmessage;
    onmessageerror;
    removeEventListener;
    terminate;
    url;

    constructor(url) {
        this.addEventListener = jest.fn();
        this.dispatchEvent = jest.fn();
        this.onerror = jest.fn();
        this.onmessage = jest.fn();
        this.onmessageerror = jest.fn();
        this.removeEventListener = jest.fn();
        this.terminate = jest.fn();
        this.url = url;
    }

    postMessage(msg) {
        this.onmessage(msg);
    }
}

window.Worker = Worker;
