const { Router } = require('express');

const router = Router();

const database = {
    schemas: {},
    tables: {},
};

router.get('/hello', (request, response) => response.send('world'));

router.get('/schema', (request, response) => {
    response.json({ success: true, data: Object.values(database.schemas) });
});

router.post('/schema', (request, response) => {
    const schema = request.body;

    database.schemas[schema.name] = schema;
    database.tables[schema.name] = [];

    response.json({ success: true, schema });
});

router.delete('/schema/:schemaName', (request, response) => {
    const { schemaName } = request.params;

    delete database.schemas[schemaName];
    delete database.tables[schemaName];

    response.status(204).send();
});


router.post('/schema/:schemaName', (request, response) => {
    const entry = request.body;
    const { schemaName } = request.params;

    database.tables[schemaName].push(entry);

    response.json({ success: true, entry });
});

module.exports = router;
