import { useState, useEffect } from "react";
import PageLayout from "../../components/PageLayout/PageLayout";
import CredentialCard from "../../components/CredentialCard/CredentialCard";
import { Container, Row, Button } from "react-bootstrap";
import { Plus, ArrowClockwise } from "react-bootstrap-icons";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import styles from "./Credentials.module.css";
import { type Credential } from "../../types/credentials";
import { fetchUserCredentials } from "../../api/credentials";

const Credentials = () => {
    const [credentials, setCredentials] = useState<Credential[]>([]);
    const [isCredentialsloading, setIsCredentialsloading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchAndSetCredentials();
    }, []);

    const fetchAndSetCredentials = async () => {
        setIsCredentialsloading(true);
        const fetchedCredentials: Credential[] = await fetchUserCredentials();
        setCredentials(fetchedCredentials);
        setIsCredentialsloading(false);
    };

    const handleAddCredentialRedirect = () => {
        navigate("/credentials/create");
    };

    const handleRefreshCredentials = () => {
        fetchAndSetCredentials();
    };

    return (
        <PageLayout title="Your Credentials">
            <Container>
                <div className={styles["button-container"]}>
                    <Button
                        variant="primary"
                        onClick={handleRefreshCredentials}
                        disabled={isCredentialsloading}
                    >
                        Refresh <ArrowClockwise size="24" />
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleAddCredentialRedirect}
                    >
                        Add New Credential <Plus size="24" />
                    </Button>
                </div>
                {isCredentialsloading ? (
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
