import { type ReactNode } from "react";
import styles from "./PageLayout.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface Props {
    title: string;
    children: ReactNode;
}

const PageLayout = ({ title, children }: Props) => {
    return (
        <Container fluid>
            <Col>
                <Row className={styles["layout-header"]}>
                    <h1>{title}</h1>
                </Row>
                <Row className={styles["layout-body"]}>{children}</Row>
            </Col>
        </Container>
    );
};

export default PageLayout;
