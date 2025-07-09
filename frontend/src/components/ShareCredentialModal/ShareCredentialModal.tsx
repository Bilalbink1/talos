import { Modal, Form, Button } from "react-bootstrap";
import styles from "./ShareCredentialModal.module.css";

interface Props {
    showModal: boolean;
    credentialData: { [key: string]: string };
    handleCloseModal: () => void;
}

export const ShareCredentialModal = ({
    credentialData,
    showModal,
    handleCloseModal,
}: Props) => {
    return (
        <Modal
            show={showModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Share Credential
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Copy your credentials</p>
                <textarea
                    className={styles["code-block"]}
                    readOnly
                    value={JSON.stringify(credentialData, null, 4)}
                />
                <p>Copy your Public Key</p>
                <Form.Control type="text" value={"test"} readOnly />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleCloseModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};
