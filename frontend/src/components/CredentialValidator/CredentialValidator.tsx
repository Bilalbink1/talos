import { useState, type ChangeEvent } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { type Credential } from "../../types/credentials";
import styles from "./CredentialValidator.module.css";
import { verifyCredential } from "../../api/credentials";

const CredentialValidator = () => {
    const [isVerificationLoading, setIsVerificationLoading] = useState(false);
    const [credentialJsonString, setcredentialJsonString] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState("");

    const handleVerifyCredential = async () => {
        setError("");
        setShowModal(true);
        setIsVerificationLoading(true);
        const credential: Credential | null = convertJSONStringTOCredential();

        if (credential === null) {
            return;
        }

        const isValid: boolean = await verifyCredential(credential);

        if (!isValid) {
            setError("Credential is not valid!");
        }

        setIsVerificationLoading(false);
    };

    const convertJSONStringTOCredential = () => {
        try {
            const credential: Credential = JSON.parse(credentialJsonString);
            return credential;
        } catch (e) {
            setError("Invalid JSON.");
            return null;
        }
    };

    const handlecredentialJsonStringChange = (event: ChangeEvent) => {
        setError("");
        setcredentialJsonString((event.target as HTMLInputElement).value);
    };

    return (
        <>
            <Form>
                <Form.Group
                    className="mb-3"
                    controlId="verificationForm.CredentialTextArea"
                >
                    <Form.Label className="h6">Enter Credential</Form.Label>
                    <Form.Control
                        className={styles["code-block"]}
                        value={credentialJsonString}
                        onChange={handlecredentialJsonStringChange}
                        as="textarea"
                        rows={3}
                    />
                </Form.Group>
                <Button
                    onClick={handleVerifyCredential}
                    disabled={credentialJsonString === ""}
                >
                    {isVerificationLoading ? "Loading…" : "Verify Credential"}
                </Button>
            </Form>
            <Modal show={showModal} size="lg" centered>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {error
                            ? "Error Verifying Credential"
                            : isVerificationLoading
                            ? "Verifying Credential"
                            : "Credential is Valid!"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error ? (
                        error
                    ) : isVerificationLoading ? (
                        <Spinner animation="border" />
                    ) : (
                        "The credential provided is verified!"
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CredentialValidator;
