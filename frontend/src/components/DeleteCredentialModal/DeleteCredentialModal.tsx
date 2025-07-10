import { Modal, Button } from "react-bootstrap";

interface Props {
    showModal: boolean;
    handleCloseModal: () => void;
    handleDeleteCredential: () => void;
}

const DeleteCredentialModal = ({
    showModal,
    handleCloseModal,
    handleDeleteCredential,
}: Props) => {
    return (
        <Modal show={showModal} centered>
            <Modal.Header>
                <Modal.Title>Confirm Delete </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Are you sure you want to delete the credential?</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDeleteCredential}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteCredentialModal;
