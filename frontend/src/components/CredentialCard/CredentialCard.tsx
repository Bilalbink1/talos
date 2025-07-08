import Card from "react-bootstrap/Card";
import styles from "./CredentialCard.module.css";
import { useNavigate } from "react-router-dom";

interface Props {
    id: number;
    name: string;
    description: string;
}

const CredentialCard = ({ id, name, description }: Props) => {
    const navigate = useNavigate();

    const hanldeCredentialDetailsRedirect = () => {
        navigate(`/credentials/${id}`);
    };

    return (
        <Card
            className={styles["credential-card-container"]}
            bg="light"
            onClick={hanldeCredentialDetailsRedirect}
        >
            <Card.Body className={styles["credential-card-body"]}>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default CredentialCard;
