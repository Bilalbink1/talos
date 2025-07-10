import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "./CredentialValidator.module.css";

const CredentialValidator = () => {
    const [isVerificationLoading, setIsVerificationLoading] = useState(false);

    const handleVerifyCredential = () => [setIsVerificationLoading(true)];

    return (
        <Form>
            <Form.Group
                className="mb-3"
                controlId="verificationForm.CredentialTextArea"
            >
                <Form.Label className="h6">Enter Credential</Form.Label>
                <Form.Control
                    className={styles["code-block"]}
                    as="textarea"
                    rows={3}
                />
            </Form.Group>
            <Button onClick={handleVerifyCredential}>
                {isVerificationLoading ? "Loading…" : "Verify Credential"}
            </Button>
        </Form>
    );
};

export default CredentialValidator;
