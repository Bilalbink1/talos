// src/components/Button.test.tsx
import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Credentials from "./Credentials";
import userEvent from "@testing-library/user-event";

vi.mock("../../api/credentials", () => ({
    fetchUserCredentials: () =>
        Promise.resolve({
            credentials: [
                {
                    id: "a1f1d0aa-234b-4cfd-a12e-987654321001",
                    issuer_id: 0,
                    name: "Student ID",
                    description: "University issued ID card",
                    payload: {
                        university: "Bilkent University",
                        student_id: "20231001",
                    },
                    signature: "abc123signature",
                    created_date: "2025-06-15T10:20:00Z",
                },
                {
                    id: "b2e2d1bb-567c-4aab-b34f-123456789002",
                    issuer_id: 0,
                    name: "Library Membership",
                    description: "Public Library Card",
                    payload: {
                        member_name: "John Doe",
                        expiry: "2026-01-01",
                    },
                    signature: "xyz789signature",
                    created_date: "2025-07-01T15:45:30Z",
                },
                {
                    id: "c3f3e2cc-89de-4bcd-c56a-abcdefabcdef",
                    issuer_id: 0,
                    name: "Health Insurance",
                    description: "Basic coverage plan",
                    payload: {
                        provider: "Abassi Sheheed Hospital",
                        plan_id: "ASH-123456",
                    },
                    signature: "sig456example",
                    created_date: "2025-07-10T08:30:15Z",
                },
            ],
            error: null,
        }),
}));

describe("Credentials", () => {
    it("renders the credentials from the API on mount and on refresh button click", async () => {
        render(
            <MemoryRouter>
                <Credentials />
            </MemoryRouter>
        );
        expect(await screen.findByText("Student ID")).toBeInTheDocument();
        expect(
            await screen.findByText("Library Membership")
        ).toBeInTheDocument();
        expect(await screen.findByText("Health Insurance")).toBeInTheDocument();

        const refreshButton = screen.getByRole("button", {
            name: /Refresh/i,
        });

        // Mock user refreshing the credentials
        await userEvent.click(refreshButton);

        expect(await screen.findByText("Student ID")).toBeInTheDocument();
        expect(
            await screen.findByText("Library Membership")
        ).toBeInTheDocument();
        expect(await screen.findByText("Health Insurance")).toBeInTheDocument();
    });
});
