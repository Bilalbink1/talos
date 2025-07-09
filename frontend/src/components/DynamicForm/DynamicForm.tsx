import { useState, type ChangeEvent } from "react";
import Form from "react-bootstrap/Form";
import { Button, Row, Col } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";

const DynamicForm = () => {
    const [attributeList, setAttributeList] = useState([
        { attributeName: "", attributeValue: "" },
    ]);

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
     * This function will use the attributeList state to generate a JSON containing all the attribute names as keys and attribute values as values.
     */
    const handleCreateCredential = () => {
        let result: { [key: string]: string } = {};
        for (const attribute of attributeList) {
            result[attribute.attributeName] = attribute.attributeValue;
        }

        console.log(result);
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

    return (
        <>
            <Form>
                {attributeList.map((attribute, index) => (
                    <Form.Group
                        key={index}
                        as={Row}
                        className="mb-3"
                        controlId="`attributeForm${index}`"
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
                        <Col sm="10">
                            <Form.Control
                                value={attribute.attributeValue}
                                placeholder="Attribute Value"
                                onChange={(event) =>
                                    hanldeAttributeValue(event, index)
                                }
                            />
                        </Col>
                    </Form.Group>
                ))}
            </Form>
            <Button variant="primary" onClick={handleCreateCredential}>
                Save Credential <Plus size="24" />
            </Button>
            <Button variant="primary" onClick={handleAddNewAttributeField}>
                Add New Credential <Plus size="24" />
            </Button>
        </>
    );
};

export default DynamicForm;
