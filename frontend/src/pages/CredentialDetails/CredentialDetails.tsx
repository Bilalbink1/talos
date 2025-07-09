import { Container, Stack, Button, Modal, Form } from "react-bootstrap";
import { Share } from "react-bootstrap-icons";
import PageLayout from "../../components/PageLayout/PageLayout";
import DynamicForm from "../../components/DynamicForm/DynamicForm";
import { ShareCredentialModal } from "../../components/ShareCredentialModal/ShareCredentialModal";
import { useState } from "react";

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
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <PageLayout title="Credential Details">
            <Container>
                <DynamicForm credential={sampleData} previewMode={true} />
                <Stack gap={2} className="col-md-2">
                    <Button
                        variant="primary"
                        onClick={() => setShowModal(true)}
                    >
                        Share Credential <Share />
                    </Button>
                    <Button variant="danger">Delete Credential</Button>
                </Stack>
            </Container>
            <ShareCredentialModal
                showModal={showModal}
                handleCloseModal={handleCloseModal}
                credentialData={sampleData.data}
            />
        </PageLayout>
    );
};

export default CredentialDetails;
