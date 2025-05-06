import { LoginPage } from "@pages";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
// Mock hooks
const mockDispatch = vi.fn();

vi.mock("@hooks", () => ({
    useAppDispatch: () => mockDispatch,
    useAppSelector: () => ({
        isLoading: false,
        captchaUrl: null,
        error: null,
        isAuth: false,
    }),
}));

describe("LoginPage", (): void => {
    it("renders the LoginPage with all components", () => {
        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );

        // Check if the title is rendered
        expect(screen.getByText("Sign In")).toBeInTheDocument();

        // Check if the email and password fields are rendered
        expect(screen.getByLabelText("Email")).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();

        // Check if the submit button is rendered
        expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
    });
});
