import React, { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';

import SchemaList from './List.component';
import SchemaBuilder from './Builder.component';
import { createSchema, getSchemas, removeSchema } from './actions';

const Page = () => {
    const [creating, setCreating] = useState(false);
    const [loading, setLoading] = useState(true);
    const [schemas, setSchemas] = useState([]);

    const handleCreate = (schema) => {
        setCreating(true);
        return createSchema(schema).then((response) => {
            setCreating(false);
            setSchemas([response.data.schema, ...schemas]);
        });
    };

    const handleRemove = (schemaName) => {
        setLoading(true);
        return removeSchema(schemaName).then(() => {
            setLoading(false);
            setSchemas(schemas.filter((sch) => sch.name !== schemaName));
        });
    };

    useEffect(() => {
        setLoading(true);
        getSchemas().then((response) => {
            setLoading(false);
            setSchemas(response.data.data);
        });
    }, []);

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column computer={8} tablet={10} mobile={16}>
                    <SchemaBuilder
                        creating={creating}
                        onCreate={handleCreate}
                    />
                </Grid.Column>
                <Grid.Column computer={8} tablet={10} mobile={16}>
                    <SchemaList
                        loading={loading}
                        schemas={schemas}
                        onRemove={handleRemove}
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default Page;
