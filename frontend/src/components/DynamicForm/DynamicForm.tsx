import { useEffect, useState, type ChangeEvent } from "react";
import styles from "./DynamicForm.module.css";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { Button, Row, Col } from "react-bootstrap";
import { Plus, TrashFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import {
    type Credential,
    type CredentialCreate,
} from "../../types/credentials";
import { createNewCredential } from "../../api/credentials";
import { type DefaultResponse } from "../../types/response";

interface Props {
    credential?: Credential | null;
    previewMode: boolean;
}
interface CredentialFormDetails {
    name: string;
    description: string;
}

const DynamicForm = ({ credential, previewMode = false }: Props) => {
    const [credentialDetails, setCredentialDetails] =
        useState<CredentialFormDetails>({
            name: "",
            description: "",
        });
    const [attributeList, setAttributeList] = useState([
        { attributeName: "", attributeValue: "" },
    ]);
    const [isCreateCredentialLoading, setIsCreateCredentialLoading] =
        useState(false);

    // Ensure there are no empty fields in the dynamic form
    const isSaveCredentialsDisabled =
        attributeList.some(
            (attribute) =>
                attribute.attributeName === "" ||
                attribute.attributeValue === ""
        ) ||
        credentialDetails.name === "" ||
        isCreateCredentialLoading;

    const navigate = useNavigate();

    useEffect(() => {
        if (credential && previewMode) {
            setCredentialDetails({
                name: credential.name,
                description: credential.description,
            });

            setAttributeList(
                convertCredentialToAttributeList(credential.payload)
            );
        }
    }, []);

    /**
     * This function converts the key value pairs of the credentials to an array of objects with the format:
     *  {
     *      "attributeName": key,
     *      "attributeValue": value
     *  }
     *  This will allow us to display the attributes exactly how the user added them in preview mode
     * @param {object} credentialData
     * @returns
     */
    const convertCredentialToAttributeList = (credentialData: object) => {
        let result = [];

        for (const [key, value] of Object.entries(credentialData)) {
            result.push({
                attributeName: key,
                attributeValue: value,
            });
        }

        return result;
    };

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
    const handleCreateCredential = async () => {
        let newCredential: CredentialCreate = {
            name: credentialDetails.name,
            description: credentialDetails.description,
            payload: {},
        };

        for (const attribute of attributeList) {
            // The keys for the payload are dynamic, its possible the user enters duplicate keys on accident
            // In that case we will check if the attribute already exists and inform the user if there is a duplicate
            if (
                newCredential["payload"].hasOwnProperty(attribute.attributeName)
            ) {
                alert(
                    "Duplicate attribute names were found. Please remove the duplicate to continue"
                );
                return;
            }

            newCredential["payload"][attribute.attributeName] =
                attribute.attributeValue;
        }

        setIsCreateCredentialLoading(true);
        const result: DefaultResponse =
            await createNewCredential(newCredential);

        if (result.error) {
            alert(result.error);
        }

        setIsCreateCredentialLoading(false);

        navigate("/credentials");
    };

    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="credential-name">
                    <Row className={styles["credentials-details-row"]}>
                        <Form.Label className="h6" column lg={2}>
                            Name
                        </Form.Label>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Enter credential name"
                                readOnly={previewMode}
                                value={credentialDetails.name}
                                onChange={(event) =>
                                    handleCredentialDetailChange(event, "name")
                                }
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="mb-3" controlId="credential-description">
                    <Row className={styles["credentials-details-row"]}>
                        <Form.Label className="h6" column lg={2}>
                            Description
                        </Form.Label>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Enter description (Optional)"
                                readOnly={previewMode}
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
                                    readOnly={previewMode}
                                    onChange={(event) =>
                                        hanldeAttributeName(event, index)
                                    }
                                />
                            </Col>
                            <Col sm="8">
                                <Form.Control
                                    value={attribute.attributeValue}
                                    placeholder="Attribute Value"
                                    readOnly={previewMode}
                                    onChange={(event) =>
                                        hanldeAttributeValue(event, index)
                                    }
                                />
                            </Col>
                            <Col sm="2">
                                {!previewMode && (
                                    <Button
                                        aria-label={`delete-attribute-${index}`}
                                        className={styles["delete-btn"]}
                                        variant="danger"
                                        onClick={() =>
                                            handleRemoveAttributeField(index)
                                        }
                                    >
                                        <TrashFill size="20" />
                                    </Button>
                                )}
                            </Col>
                        </Form.Group>
                    ))}
                    {!previewMode && (
                        <Button
                            variant="primary"
                            onClick={handleAddNewAttributeField}
                            disabled={isCreateCredentialLoading}
                        >
                            Add New Attribute <Plus size="24" />
                        </Button>
                    )}
                </div>
            </Form>
            {!previewMode && (
                <Button
                    className={styles["save-credential-btn"]}
                    variant="primary"
                    onClick={handleCreateCredential}
                    disabled={isSaveCredentialsDisabled}
                >
                    {isSaveCredentialsDisabled}
                    Save Credential{" "}
                    {isCreateCredentialLoading && (
                        <Spinner animation="border" size="sm" />
                    )}
                </Button>
            )}
        </>
    );
};

export default DynamicForm;
