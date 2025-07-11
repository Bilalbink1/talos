import { useEffect, useState } from "react";
import { Container, Row, Stack, Button } from "react-bootstrap";
import { Share } from "react-bootstrap-icons";
import Spinner from "react-bootstrap/Spinner";
import PageLayout from "../../components/PageLayout/PageLayout";
import DynamicForm from "../../components/DynamicForm/DynamicForm";
import ShareCredentialModal from "../../components/ShareCredentialModal/ShareCredentialModal";
import DeleteCredentialModal from "../../components/DeleteCredentialModal/DeleteCredentialModal";
import { useParams } from "react-router-dom";
import { type Credential } from "../../types/credentials";
import { fetchUserCredential } from "../../api/credentials";

const CredentialDetails = () => {
    const [credential, setCredential] = useState<Credential>();
    const [loading, setLoading] = useState(false);
    const [showCredentialShareModal, setShowCredentialShareModal] =
        useState(false);
    const [showDeleteCredentialModal, setShowDeleteCredentialModal] =
        useState(false);

    const params = useParams();

    useEffect(() => {
        fetchAndSetUserCredential();
    }, []);

    const fetchAndSetUserCredential = async () => {
        setLoading(true);
        const credentialId: string = params.id!;
        const fetchedCredential: Credential = await fetchUserCredential(
            credentialId
        );
        setCredential(fetchedCredential);
        setLoading(false);
    };

    const handleClosCredentialShareModal = () => {
        setShowCredentialShareModal(false);
    };

    const handleClosDeleteCredentialModal = () => {
        setShowDeleteCredentialModal(false);
    };

    const handleDeleteCredential = () => {
        handleClosDeleteCredentialModal();
    };

    return (
        <PageLayout title="Credential Details">
            {loading ? (
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
                        />
                    </>
                )
            )}
        </PageLayout>
    );
};

export default CredentialDetails;
