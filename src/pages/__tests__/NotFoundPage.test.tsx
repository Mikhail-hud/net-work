import { NotFoundPage } from "@pages";
import { beforeEach, Mock } from "vitest";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { PROFILE_PAGE_PATH } from "@constants/pathConstants";
import { cleanup, render, screen } from "@testing-library/react";

const useNavigateMock: Mock = vi.fn();

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual(`react-router-dom`);
    return {
        ...actual,
        useNavigate: (): Mock => useNavigateMock,
    };
});

describe("NotFoundPage", (): void => {
    beforeEach(() => {
        cleanup();
    });
    it("renders the 404 page with correct content", () => {
        render(
            <BrowserRouter>
                <NotFoundPage />
            </BrowserRouter>
        );

        expect(screen.getByText("404")).toBeInTheDocument();
        expect(screen.getByText("Sorry, the page you visited does not exist.")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Back Home/i })).toBeInTheDocument();
    });

    it("navigates to the profile page when the button is clicked", async (): Promise<void> => {
        render(
            <BrowserRouter>
                <NotFoundPage />
            </BrowserRouter>
        );

        const button = screen.getByRole("button", { name: /Back Home/i });
        await userEvent.click(button);

        expect(useNavigateMock).toHaveBeenCalledWith(PROFILE_PAGE_PATH);
    });
});
