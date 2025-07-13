import { useEffect, useState } from "react";
import { Container, Row, Stack, Button } from "react-bootstrap";
import { Share } from "react-bootstrap-icons";
import Spinner from "react-bootstrap/Spinner";
import PageLayout from "../../components/PageLayout/PageLayout";
import DynamicForm from "../../components/DynamicForm/DynamicForm";
import ShareCredentialModal from "../../components/ShareCredentialModal/ShareCredentialModal";
import DeleteCredentialModal from "../../components/DeleteCredentialModal/DeleteCredentialModal";
import { useParams, useNavigate } from "react-router-dom";
import { type Credential } from "../../types/credentials";
import { fetchUserCredential, deleteCredential } from "../../api/credentials";
import {
    type DefaultResponse,
    type FetchUserCredentialResponse,
} from "../../types/response";

const CredentialDetails = () => {
    const [credential, setCredential] = useState<Credential | null>(null);
    const [isCredentialLoading, setIsCredentialLoading] = useState(false);
    const [isDeleteCredentialLoading, setIsDeleteCredentialLoading] =
        useState(false);
    const [showCredentialShareModal, setShowCredentialShareModal] =
        useState(false);
    const [showDeleteCredentialModal, setShowDeleteCredentialModal] =
        useState(false);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchAndSetUserCredential();
    }, []);

    /**
     * This function retrieves the credential for the provided credential id from the backend service
     * and sets the value to the credential state.
     * Displays an error alert in case of an error
     */
    const fetchAndSetUserCredential = async () => {
        setIsCredentialLoading(true);
        const credentialId: string = params.id!;
        const result: FetchUserCredentialResponse =
            await fetchUserCredential(credentialId);

        setCredential(result.credential);
        setIsCredentialLoading(false);

        if (result.error) {
            alert(result.error);
            navigate("/credentials");
        }
    };

    const handleClosCredentialShareModal = () => {
        setShowCredentialShareModal(false);
    };

    const handleClosDeleteCredentialModal = () => {
        setShowDeleteCredentialModal(false);
    };

    /**
     * This function sends a request to delete the credential for the given credential_id to the backend service
     */
    const handleDeleteCredential = async () => {
        if (credential) {
            setIsDeleteCredentialLoading(true);
            const result: DefaultResponse = await deleteCredential(
                credential.id
            );

            setIsDeleteCredentialLoading(false);

            if (result.error) {
                alert(result.error);
                setShowDeleteCredentialModal(false);
                return;
            }

            navigate("/credentials");
        }
        handleClosDeleteCredentialModal();
    };

    return (
        <PageLayout title="Credential Details">
            {isCredentialLoading ? (
                <Row className="justify-content-md-center">
                    <Spinner animation="border" />
                </Row>
            ) : (
                credential && (
                    <>
                        <Container>
                            <DynamicForm
                                credential={credential}
                                previewMode={true}
                            />
                            <Stack gap={2} className="col-md-2">
                                <Button
                                    variant="primary"
                                    onClick={() =>
                                        setShowCredentialShareModal(true)
                                    }
                                >
                                    Share Credential <Share />
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() =>
                                        setShowDeleteCredentialModal(true)
                                    }
                                >
                                    Delete Credential
                                </Button>
                            </Stack>
                        </Container>
                        <ShareCredentialModal
                            showModal={showCredentialShareModal}
                            handleCloseModal={handleClosCredentialShareModal}
                            credential={credential}
                        />
                        <DeleteCredentialModal
                            showModal={showDeleteCredentialModal}
                            handleCloseModal={handleClosDeleteCredentialModal}
                            handleDeleteCredential={handleDeleteCredential}
                            isDeleteCredentialLoading={
                                isDeleteCredentialLoading
                            }
                        />
                    </>
                )
            )}
        </PageLayout>
    );
};

export default CredentialDetails;
