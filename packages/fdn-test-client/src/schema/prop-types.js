import {
    arrayOf,
    string,
    oneOf,
    func,
    bool,
} from 'prop-types';

import { SchemaFieldTypes } from './constants';

export const SchemaFieldPropTypes = {
    name: string.isRequired,
    type: oneOf(Object.values(SchemaFieldTypes)).isRequired,
};

export const SchemaPropTypes = {
    name: string.isRequired,
    fields: arrayOf(SchemaFieldPropTypes).isRequired,
};

export const FieldPropTypes = {
    ...SchemaFieldPropTypes,
    onNameChange: func.isRequired,
    onTypeChange: func.isRequired,
    onRemoveField: func.isRequired,
};

export const BuilderPropTypes = {
    onCreate: func.isRequired,
    creating: bool.isRequired,
};

export const ListPropTypes = {
    loading: bool.isRequired,
    items: arrayOf(SchemaFieldPropTypes),
};
