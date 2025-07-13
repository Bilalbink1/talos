// src/components/Button.test.tsx
import { vi, describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CredentialDetails from "./CredentialDetails";
import userEvent from "@testing-library/user-event";

vi.mock("../../api/credentials", () => ({
    fetchUserCredential: () =>
        Promise.resolve({
            credential: {
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
            error: null,
        }),
}));

describe("CredentialDetails", () => {
    it("renders the credential name and description from the API on mount", async () => {
        render(
            <MemoryRouter>
                <CredentialDetails />
            </MemoryRouter>
        );

        await waitFor(() =>
            expect(screen.queryByRole("status")).not.toBeInTheDocument()
        );

        // Check for credential name input
        const nameInput = screen.getByLabelText("Name");
        expect(nameInput).toBeInTheDocument();
        expect(nameInput).toHaveValue("Student ID");

        // Check for credential description
        const descriptionInput = screen.getByLabelText("Description");
        expect(descriptionInput).toBeInTheDocument();
        expect(descriptionInput).toHaveValue("University issued ID card");
    });

    it("renders the share credential modal with the credential value as JSON formatted string", async () => {
        render(
            <MemoryRouter>
                <CredentialDetails />
            </MemoryRouter>
        );

        await waitFor(() =>
            expect(screen.queryByRole("status")).not.toBeInTheDocument()
        );

        const shareCredentialButton = screen.getByRole("button", {
            name: /Share Credential/i,
        });

        // Open the share credential modal
        await userEvent.click(shareCredentialButton);

        // Retrieve the credentials textarea
        const credentialCodeBlock = screen.getByLabelText(
            "credential-json-string"
        ) as HTMLTextAreaElement;

        // Parsing the data to JSON for comparision
        const parsedcredentialCodeBlockValue = JSON.parse(
            credentialCodeBlock.value
        );

        const expectedCodeBlockValue = {
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
        };

        expect(parsedcredentialCodeBlockValue).toEqual(expectedCodeBlockValue);
    });
});
