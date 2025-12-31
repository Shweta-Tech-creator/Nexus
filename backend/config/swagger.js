const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Nexus API',
            version: '1.0.0',
            description: 'API documentation for the Nexus backend.',
            contact: {
                name: 'Developer',
            },
        },
        servers: [
            {
                url: 'http://localhost:5001/api',
                description: 'Local Development Server',
            },
            {
                url: 'https://nexus-saas-dashboard.onrender.com/api',
                description: 'Production Server',
            },
        ],
        components: {
            securitySchemes: {
                xAuthToken: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'x-auth-token',
                    description: 'JWT authorization header using the x-auth-token scheme. Example: "x-auth-token: <your_token>"',
                },
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        email: { type: 'string' },
                        avatar: { type: 'string' },
                        joinedAt: { type: 'string', format: 'date-time' },
                    },
                },
                Task: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        title: { type: 'string' },
                        status: { type: 'string', enum: ['pending', 'in-progress', 'completed'] },
                        createdAt: { type: 'string', format: 'date-time' },
                    },
                },
            },
        },
        security: [
            {
                xAuthToken: [],
            },
        ],
    },
    apis: ['./routes/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = specs;
