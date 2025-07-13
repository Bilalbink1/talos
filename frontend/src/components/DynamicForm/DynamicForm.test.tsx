import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DynamicForm from "./DynamicForm";
import userEvent from "@testing-library/user-event";
import { type Credential } from "../../types/credentials";

const sampleCredential: Credential = {
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

describe("DynamicForm", () => {
    it("renders the credential details and its dynamic attributes when the credential prop is passed and preview mode is set to true", async () => {
        render(
            <MemoryRouter>
                <DynamicForm credential={sampleCredential} previewMode={true} />
            </MemoryRouter>
        );

        // Check for credential name
        const nameInput = screen.getByLabelText("Name");
        expect(nameInput).toBeInTheDocument();
        expect(nameInput).toHaveValue("Student ID");

        // Check for credential description
        const descriptionInput = screen.getByLabelText("Description");
        expect(descriptionInput).toBeInTheDocument();
        expect(descriptionInput).toHaveValue("University issued ID card");

        // Check for the payload attribute names and values
        const attributeNameInputs =
            screen.getAllByPlaceholderText("Attribure Name");
        expect(attributeNameInputs[0]).toBeInTheDocument();
        expect(attributeNameInputs[0]).toHaveValue("university");

        expect(attributeNameInputs[1]).toBeInTheDocument();
        expect(attributeNameInputs[1]).toHaveValue("student_id");

        const attributeValueInputs =
            screen.getAllByPlaceholderText("Attribute Value");
        expect(attributeValueInputs[0]).toBeInTheDocument();
        expect(attributeValueInputs[0]).toHaveValue("Bilkent University");

        expect(attributeValueInputs[1]).toBeInTheDocument();
        expect(attributeValueInputs[1]).toHaveValue("20231001");
    });

    it("renders the empty input fields when preview mode set to false", async () => {
        render(
            <MemoryRouter>
                <DynamicForm credential={null} previewMode={false} />
            </MemoryRouter>
        );
        // Check for credential name input
        const nameInput = screen.getByLabelText("Name");
        expect(nameInput).toBeInTheDocument();
        expect(nameInput).toHaveValue("");

        // Check for credential description input
        const descriptionInput = screen.getByLabelText("Description");
        expect(descriptionInput).toBeInTheDocument();
        expect(descriptionInput).toHaveValue("");

        // Check for the attribute fields to have only 1 inputfield rendered for Attribure Name and Attribute value
        const attributeNameInputs =
            screen.getAllByPlaceholderText("Attribure Name");
        expect(attributeNameInputs).toHaveLength(1);

        const attributeValueInputs =
            screen.getAllByPlaceholderText("Attribute Value");
        expect(attributeValueInputs).toHaveLength(1);
    });

    it("adds a new empty attribute input fields and removes them using the buttons", async () => {
        render(
            <MemoryRouter>
                <DynamicForm credential={null} previewMode={false} />
            </MemoryRouter>
        );

        const addAttributeButton = screen.getByRole("button", {
            name: /Add New Credential/i,
        });

        await userEvent.click(addAttributeButton);

        let attributeNameInputs =
            screen.getAllByPlaceholderText("Attribure Name");
        expect(attributeNameInputs).toHaveLength(2);

        let attributeValueInputs =
            screen.getAllByPlaceholderText("Attribute Value");
        expect(attributeValueInputs).toHaveLength(2);

        const deleteAttributeButton =
            screen.getByLabelText("delete-attribute-1");

        await userEvent.click(deleteAttributeButton);

        attributeNameInputs = screen.getAllByPlaceholderText("Attribure Name");
        expect(attributeNameInputs).toHaveLength(1);

        attributeValueInputs =
            screen.getAllByPlaceholderText("Attribute Value");
        expect(attributeValueInputs).toHaveLength(1);
    });
});
