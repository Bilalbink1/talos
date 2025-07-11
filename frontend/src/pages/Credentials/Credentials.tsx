import { useState, useEffect } from "react";
import PageLayout from "../../components/PageLayout/PageLayout";
import CredentialCard from "../../components/CredentialCard/CredentialCard";
import { Container, Row, Button } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import styles from "./Credentials.module.css";
import { type Credential } from "../../types/credentials";
import { fetchUserCredentials } from "../../api/credentials";

const Credentials = () => {
    const [credentials, setCredentials] = useState<Credential[]>([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchAndSetCredentials();
    }, []);

    const fetchAndSetCredentials = async () => {
        setLoading(true);
        const fetchedCredentials: Credential[] = await fetchUserCredentials();
        setCredentials(fetchedCredentials);
        setLoading(false);
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
                {loading ? (
                    <Row className="justify-content-md-center">
                        <Spinner animation="border" />
                    </Row>
                ) : (
                    credentials.map((credential) => (
                        <CredentialCard
                            key={credential.id}
                            id={credential.id}
                            name={credential.name}
                            description={credential.description}
                        />
                    ))
                )}
            </Container>
        </PageLayout>
    );
};

export default Credentials;
