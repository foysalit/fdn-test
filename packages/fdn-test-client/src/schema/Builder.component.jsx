import React, { useState } from 'react';
import {
    Segment,
    Header,
    Button,
    Form,
} from 'semantic-ui-react';

import Field from './Field.component';
import { EmptySchemaField } from './constants';
import { BuilderPropTypes } from './prop-types';

const Builder = ({
    onCreate, creating,
}) => {
    const [name, setName] = useState('');
    const [fields, setFields] = useState([{ ...EmptySchemaField }]);

    const addNewField = () => {
        setFields([...fields, { ...EmptySchemaField }]);
    };

    const removeField = (fieldIndex) => {
        const newFields = [...fields];
        newFields.splice(fieldIndex, 1);
        setFields(newFields);
    };

    const changeFieldType = (fieldIndex, type) => {
        const newFields = [...fields];
        newFields[fieldIndex] = { ...newFields[fieldIndex], type };
        setFields(newFields);
    };

    const changeFieldName = (fieldIndex, name) => {
        const newFields = [...fields];
        newFields[fieldIndex] = { ...newFields[fieldIndex], name };
        setFields(newFields);
    };

    return (
        <>
            <Header attached="top" size="large">
                Create new schema
            </Header>

            <Segment attached loading={creating}>
                <Form>
                    <Form.Input
                        type="text"
                        label="Schema Name"
                        value={name}
                        onChange={(e, { value }) => setName(value)}
                    />

                    {fields.map((field, fieldIndex) => (
                        <Field
                            key={`schema_field_${fieldIndex}`}
                            name={field.name}
                            type={field.type}
                            validators={field.validators}
                            onRemoveField={() => removeField(fieldIndex)}
                            onNameChange={(value) => changeFieldName(fieldIndex, value)}
                            onTypeChange={(type) => changeFieldType(fieldIndex, type)}
                        />
                    ))}
                </Form>

                <Button
                    size="small"
                    content="Add Field"
                    onClick={addNewField}
                />
            </Segment>
            <Button
                attached="bottom"
                content="Save Schema"
                onClick={() => onCreate({ name, fields })}
            />
        </>
    );
};

Builder.propTypes = BuilderPropTypes;

export default Builder;
