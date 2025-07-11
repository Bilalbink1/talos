import { useState, useEffect } from "react";
import PageLayout from "../../components/PageLayout/PageLayout";
import CredentialCard from "../../components/CredentialCard/CredentialCard";
import { Container, Button } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import styles from "./Credentials.module.css";
import { type Credential } from "../../types/credentials";
import { fetchUserCredentials } from "../../api/credentials";

const Credentials = () => {
    const [credentials, setCredentials] = useState<Credential[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAndSetCredentials();
    }, []);

    const fetchAndSetCredentials = async () => {
        const fetchedCredentials: Credential[] = await fetchUserCredentials();
        console.log(fetchedCredentials);
        setCredentials(fetchedCredentials);
    };

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
                {credentials.map((credential) => (
                    <CredentialCard
                        key={credential.id}
                        id={credential.id}
                        name={credential.name}
                        description={credential.description}
                    />
                ))}
            </Container>
        </PageLayout>
    );
};

export default Credentials;
