import React from "react";
import Card from "react-bootstrap/Card";
import styles from "./CredentialCard.module.css";

interface Props {
    name: string;
    description: string;
}

const CredentialCard = ({ name, description }: Props) => {
    return (
        <Card
            className={styles["credential-card-container"]}
            bg="light"
            onClick={() => console.log("test")}
        >
            <Card.Body className={styles["credential-card-body"]}>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default CredentialCard;
