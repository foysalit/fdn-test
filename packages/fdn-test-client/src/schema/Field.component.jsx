import React from 'react';
import { Form, Button, Divider } from 'semantic-ui-react';

import { FieldPropTypes } from './prop-types';
import { SchemaFieldTypes } from './constants';

const Field = ({
    name, type,
    onNameChange, onTypeChange, onRemoveField,
}) => {
    const typeOptions = Object.values(SchemaFieldTypes).map((typeOption) => ({
        value: typeOption,
        text: typeOption.replace('_', ' '),
        key: `field_type_option_${typeOption}`,
    }));

    return (
        <>
            <Divider horizontal clearing>
                Field
            </Divider>
            <Form.Input
                type="text"
                value={name}
                label="Field Name"
                onChange={(e, { value }) => onNameChange(value)}
            />

            <Form.Dropdown
                fluid
                selection
                value={type}
                label="Field Type"
                options={typeOptions}
                onChange={(e, { value }) => onTypeChange(value)}
            />

            <Button
                negative
                size="small"
                floated="right"
                content="Remove Field"
                onClick={onRemoveField}
            />
        </>
    );
};

Field.propTypes = FieldPropTypes;

export default Field;
