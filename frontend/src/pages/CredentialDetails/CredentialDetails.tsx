import { Container } from "react-bootstrap";
import PageLayout from "../../components/PageLayout/PageLayout";
import CredentialReadOnlyForm from "../../components/CredentialReadOnlyForm/CredentialReadOnlyForm";

const sampleData = {
    id: 1,
    name: "Gym Membership",
    description: "test",
    credential: {
        membership_number: 1235332432,
        expiry_date: "tomorrow",
    },
};

const CredentialDetails = () => {
    return (
        <PageLayout title="Credential Details">
            <Container>
                <CredentialReadOnlyForm />
            </Container>
        </PageLayout>
    );
};

export default CredentialDetails;
