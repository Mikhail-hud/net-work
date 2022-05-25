import { render } from "@testing-library/react";
import { LoginPage } from "../../pages";

describe("Login Page", () => {
    it("should render login page", () => {
        const { findByText } = render(<LoginPage />);
        const page = findByText(/Sign In/i);
        expect(page).toBeInTheDocument();
    });
});
