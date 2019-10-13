import axios from 'axios';

export const getSchemas = () => axios({
    url: '/schema',
    method: 'GET',
});

export const createSchema = (schema = {}) => axios({
    url: '/schema',
    method: 'POST',
    data: schema,
});

export const removeSchema = (schemaName = '') => axios({
    url: `/schema/:${schemaName}`,
    method: 'DELETE',
});
