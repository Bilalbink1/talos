import { useState } from "react";
import { Container, Stack, Button } from "react-bootstrap";
import { Share } from "react-bootstrap-icons";
import PageLayout from "../../components/PageLayout/PageLayout";
import DynamicForm from "../../components/DynamicForm/DynamicForm";
import ShareCredentialModal from "../../components/ShareCredentialModal/ShareCredentialModal";
import DeleteCredentialModal from "../../components/DeleteCredentialModal/DeleteCredentialModal";
import { useParams } from "react-router-dom";

const sampleData = {
    id: "a811e702-bbd1-4c5a-ad90-feff7d157bf5",
    name: "Gym Membership",
    description: "test",
    data: {
        membership_number: "1235332432",
        expiry_date: "tomorrow",
    },
};

const CredentialDetails = () => {
    const [showCredentialShareModal, setShowCredentialShareModal] =
        useState(false);
    const [showDeleteCredentialModal, setShowDeleteCredentialModal] =
        useState(false);

    const params = useParams();

    console.log(params);

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
            <Container>
                <DynamicForm credential={sampleData} previewMode={true} />
                <Stack gap={2} className="col-md-2">
                    <Button
                        variant="primary"
                        onClick={() => setShowCredentialShareModal(true)}
                    >
                        Share Credential <Share />
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => setShowDeleteCredentialModal(true)}
                    >
                        Delete Credential
                    </Button>
                </Stack>
            </Container>
            <ShareCredentialModal
                showModal={showCredentialShareModal}
                handleCloseModal={handleClosCredentialShareModal}
                credentialData={sampleData.data}
            />
            <DeleteCredentialModal
                showModal={showDeleteCredentialModal}
                handleCloseModal={handleClosDeleteCredentialModal}
                handleDeleteCredential={handleDeleteCredential}
            />
        </PageLayout>
    );
};

export default CredentialDetails;
