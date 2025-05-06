import { DialogsPage } from "@pages";
import { beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import mockDialogs from "@app/pages/__mocks__/mockDialogs";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

// Mock the `useDialogs` hook
vi.mock("@hooks", () => ({
    useDialogs: () => ({
        dialogs: mockDialogs,
        isFetchingDialogs: false,
    }),
}));

describe("DialogsPage", (): void => {
    beforeEach((): void => {
        cleanup();
    });
    it("renders the DialogsPage and filters dialogs based on search input", (): void => {
        render(
            <MemoryRouter>
                <DialogsPage />
            </MemoryRouter>
        );

        // Check if the component renders the title
        expect(screen.getByText("Dialogs")).toBeInTheDocument();

        // Check if all dialogs are rendered initially
        expect(screen.getByText("Free")).toBeInTheDocument();
        expect(screen.getByText("Deniss")).toBeInTheDocument();

        // Simulate searching for "Deniss"
        const searchInput = screen.getByPlaceholderText("Searching for dialogs");
        fireEvent.change(searchInput, { target: { value: "Deniss" } });

        expect(searchInput).toHaveValue("Deniss");
        // Check if only "Deniss" is displayed
        expect(screen.getByText("Deniss")).toBeInTheDocument();
        expect(screen.queryByText("Free")).not.toBeInTheDocument();
    });
});
