import { useState, type ChangeEvent } from "react";
import styles from "./DynamicForm.module.css";
import Form from "react-bootstrap/Form";
import { Button, Row, Col } from "react-bootstrap";
import { Plus, TrashFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
interface CredentialDetails {
    name: string;
    description: string;
}

interface CredentialResult {
    name: string;
    description: string;
    credential: { [key: string]: string };
}

const DynamicForm = () => {
    const [credentialDetails, setCredentialDetails] =
        useState<CredentialDetails>({
            name: "",
            description: "",
        });
    const [attributeList, setAttributeList] = useState([
        { attributeName: "", attributeValue: "" },
    ]);

    const navigate = useNavigate();

    // Ensure there are no empty fields in the dynamic form
    const isSaveCredentialsDisabled =
        attributeList.some(
            (attribute) =>
                attribute.attributeName === "" ||
                attribute.attributeValue === ""
        ) && credentialDetails.name === "";

    /**
     * This function updates the value of the credential details object for the provided key in the param credentialDetailKey
     * @param {ChangeEvent} event
     * @param {string} credentialDetailKey
     */
    const handleCredentialDetailChange = (
        event: ChangeEvent,
        credentialDetailKey: string
    ) => {
        setCredentialDetails({
            ...credentialDetails,
            [credentialDetailKey]: (event.target as HTMLInputElement).value,
        });
    };

    /**
     * This function will add a new Form Group containing the input fields for a new pair of attribute name and value.
     */
    const handleAddNewAttributeField = () => {
        setAttributeList([
            ...attributeList,
            { attributeName: "", attributeValue: "" },
        ]);
    };

    /**
     * This function will locate the attribute in the attribute list and update its attributeName value
     * to the one that was input in the form.
     * @param {ChangeEvent} event
     * @param {number} attributeIndex
     */
    const hanldeAttributeName = (
        event: ChangeEvent,
        attributeIndex: number
    ) => {
        setAttributeList(
            attributeList.map((attribute, index) =>
                index === attributeIndex
                    ? {
                          ...attribute,
                          attributeName: (event.target as HTMLInputElement)
                              .value,
                      }
                    : attribute
            )
        );
    };

    /**
     * This function will locate the attribute in the attribute list and update its attributeValue value
     * to the one that was input in the form.
     * @param {ChangeEvent} event
     * @param {number} attributeIndex
     */
    const hanldeAttributeValue = (
        event: ChangeEvent,
        attributeIndex: number
    ) => {
        setAttributeList(
            attributeList.map((attribute, index) =>
                index === attributeIndex
                    ? {
                          ...attribute,
                          attributeValue: (event.target as HTMLInputElement)
                              .value,
                      }
                    : attribute
            )
        );
    };

    /**
     * This function removes an attribute field from the dynamic form
     * @param {number} attributeIndex
     */
    const handleRemoveAttributeField = (attributeIndex: number) => {
        setAttributeList(
            attributeList.filter(
                (_attribute, index) => index !== attributeIndex
            )
        );
    };

    /**
     * This function will use the attributeList state to generate a JSON containing all the attribute names as keys and attribute values as values.
     */
    const handleCreateCredential = () => {
        let result: CredentialResult = {
            name: credentialDetails.name,
            description: credentialDetails.description,
            credential: {},
        };

        for (const attribute of attributeList) {
            result["credential"][attribute.attributeName] =
                attribute.attributeValue;
        }

        navigate("/credentials");
    };

    return (
        <>
            <Form>
                <Form.Group
                    className="mb-3"
                    controlId="credential-details-form"
                >
                    <Row className={styles["credentials-details-row"]}>
                        <Form.Label className="h6" column lg={2}>
                            Name
                        </Form.Label>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Gym Membership"
                                value={credentialDetails.name}
                                onChange={(event) =>
                                    handleCredentialDetailChange(event, "name")
                                }
                            />
                        </Col>
                    </Row>
                    <Row className={styles["credentials-details-row"]}>
                        <Form.Label className="h6" column lg={2}>
                            Description
                        </Form.Label>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="My Gym Membership"
                                value={credentialDetails.description}
                                onChange={(event) =>
                                    handleCredentialDetailChange(
                                        event,
                                        "description"
                                    )
                                }
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <div className={`mb-3 ${styles["dynamic-fields-container"]}`}>
                    {attributeList.map((attribute, index) => (
                        <Form.Group
                            key={index}
                            className={styles["dynamic-form-group"]}
                            as={Row}
                            controlId={`attribute-form-${index}`}
                        >
                            <Col sm="2">
                                <Form.Control
                                    value={attribute.attributeName}
                                    placeholder="Attribure Name"
                                    onChange={(event) =>
                                        hanldeAttributeName(event, index)
                                    }
                                />
                            </Col>
                            <Col sm="8">
                                <Form.Control
                                    value={attribute.attributeValue}
                                    placeholder="Attribute Value"
                                    onChange={(event) =>
                                        hanldeAttributeValue(event, index)
                                    }
                                />
                            </Col>
                            <Col sm="2">
                                <Button
                                    className={styles["delete-btn"]}
                                    variant="danger"
                                    onClick={() =>
                                        handleRemoveAttributeField(index)
                                    }
                                >
                                    <TrashFill size="20" />
                                </Button>
                            </Col>
                        </Form.Group>
                    ))}
                    <Button
                        variant="primary"
                        onClick={handleAddNewAttributeField}
                    >
                        Add New Credential <Plus size="24" />
                    </Button>
                </div>
            </Form>
            <Button
                className={styles["save-credential-btn"]}
                variant="primary"
                onClick={handleCreateCredential}
                disabled={isSaveCredentialsDisabled}
            >
                {isSaveCredentialsDisabled}
                Save Credential
            </Button>
        </>
    );
};

export default DynamicForm;
