import { FriendsPage } from "@pages";
import { MemoryRouter } from "react-router-dom";
import mockUsers from "@app/pages/__mocks__/mockUsers";
import { render, screen } from "@testing-library/react";

// Mock the `useUsers` hook
const mockTotalCount = 2;

vi.mock("@hooks", () => ({
    useUsers: () => ({
        users: mockUsers,
        totalCount: mockTotalCount,
        isFetching: false,
        handleFollowUnfollow: vi.fn(),
        followingInProgress: [],
        isFriendsFetched: true,
        params: {
            count: "5",
            page: "1",
        },
    }),
}));

describe("FriendsPage", (): void => {
    it("renders the FriendsPage with all components", (): void => {
        render(
            <MemoryRouter>
                <FriendsPage />
            </MemoryRouter>
        );

        // Check if the title is rendered
        expect(screen.getByText("Friends")).toBeInTheDocument();

        // Check if the Search component is rendered
        expect(screen.getByPlaceholderText("Searching for friends")).toBeInTheDocument();

        // Check if the Paginator component is rendered
        expect(screen.getByText(`${mockTotalCount} Friends`)).toBeInTheDocument();
    });
});
