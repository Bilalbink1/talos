import { Container } from "react-bootstrap";
import PageLayout from "../../components/PageLayout/PageLayout";
import DynamicForm from "../../components/DynamicForm/DynamicForm";

const CredentialForm = () => {
    return (
        <PageLayout title="Create New Credential">
            <Container>
                <DynamicForm previewMode={false} />
            </Container>
        </PageLayout>
    );
};

export default CredentialForm;
