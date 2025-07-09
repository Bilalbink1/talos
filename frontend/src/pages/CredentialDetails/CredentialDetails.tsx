import { Container } from "react-bootstrap";
import PageLayout from "../../components/PageLayout/PageLayout";
import DynamicForm from "../../components/DynamicForm/DynamicForm";

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
    return (
        <PageLayout title="Credential Details">
            <Container>
                <DynamicForm credential={sampleData} previewMode={true} />
            </Container>
        </PageLayout>
    );
};

export default CredentialDetails;
