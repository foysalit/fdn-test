import React from 'react';
import {
    Segment,
    Message,
    Header,
    Button,
    Divider,
    Icon,
} from 'semantic-ui-react';

import { ListPropTypes } from './prop-types';

const List = ({
    loading, schemas,
    onRemove,
}) => (
    <>
        <Header
            size="large"
            attached="top"
            content="Your Schemas"
        />
        <Segment loading={loading} attached>
            {schemas.length > 0 ? schemas.map((schema) => (
                <div key={schema.name}>
                    <Header floated="left">
                        {schema.name} schema
                    </Header>

                    <Button
                        size="mini"
                        floated="right"
                        content={`Create ${schema.name} entry`}
                    />
                    <Button
                        icon
                        negative
                        size="mini"
                        floated="right"
                        onClick={() => onRemove(schema.name)}
                    >
                        <Icon name="trash" />
                    </Button>

                    <Divider clearing />

                    {schema.fields.map((field) => (
                       <div key={`schema_field_${schema.name}_${field.name}`}>
                           <span>{ field.name }</span>: <b>{ field.type }</b>
                       </div> 
                    ))}

                    <Divider />
                </div>
            )) : (
                <Message
                    info
                    header="No schema created yet."
                    content="Start creating your schema from the panel before me"
                />
            )}
        </Segment>
    </>
);

List.propTypes = ListPropTypes;

export default List;
