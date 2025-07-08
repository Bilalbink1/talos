import PageLayout from "../../components/PageLayout/PageLayout";
import CredentialCard from "../../components/CredentialCard/CredentialCard";
import { Container, Button } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import styles from "./Credentials.module.css";

const sampleData = [
    {
        id: 1,
        name: "Gym Membership",
        descrption:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    },
    {
        id: 2,
        name: "Gym Membership",
        descrption:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    },
    {
        id: 3,
        name: "Gym Membership",
        descrption:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    },
    {
        id: 4,
        name: "Gym Membership",
        descrption:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    },
];

const Credentials = () => {
    const navigate = useNavigate();

    const handleAddCredentialRedirect = () => {
        navigate("/credentials/create");
    };

    return (
        <PageLayout title="Your Credentials">
            <Container>
                <div className={styles["button-container"]}>
                    <Button
                        variant="primary"
                        onClick={handleAddCredentialRedirect}
                    >
                        Add New Credential <Plus size="24" />
                    </Button>
                </div>
                {sampleData.map((data) => (
                    <CredentialCard
                        key={data.id}
                        id={data.id}
                        name={data.name}
                        description={data.descrption}
                    />
                ))}
            </Container>
        </PageLayout>
    );
};

export default Credentials;
