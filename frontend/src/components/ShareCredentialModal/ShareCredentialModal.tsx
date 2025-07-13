import { Modal, Button } from "react-bootstrap";
import styles from "./ShareCredentialModal.module.css";
import { type Credential } from "../../types/credentials";

interface Props {
    showModal: boolean;
    credential: Credential;
    handleCloseModal: () => void;
}

const ShareCredentialModal = ({
    credential,
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
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Share Credential
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Copy your credentials</p>
                <textarea
                    aria-label="credential-json-string"
                    className={styles["code-block"]}
                    readOnly
                    value={JSON.stringify(credential, null, 4)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleCloseModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ShareCredentialModal;
