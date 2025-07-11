import { Modal, Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
interface Props {
    showModal: boolean;
    handleCloseModal: () => void;
    handleDeleteCredential: () => void;
    isDeleteCredentialLoading: boolean;
}

const DeleteCredentialModal = ({
    showModal,
    handleCloseModal,
    handleDeleteCredential,
    isDeleteCredentialLoading,
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
                <Button
                    variant="secondary"
                    onClick={handleCloseModal}
                    disabled={isDeleteCredentialLoading}
                >
                    Cancel
                </Button>
                <Button
                    variant="danger"
                    onClick={handleDeleteCredential}
                    disabled={isDeleteCredentialLoading}
                >
                    Delete{" "}
                    {isDeleteCredentialLoading && (
                        <Spinner animation="border" size="sm" />
                    )}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteCredentialModal;
