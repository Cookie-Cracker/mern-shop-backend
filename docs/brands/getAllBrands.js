module.exports = {
    get: {
        tags: ['Brands'],
        description: 'Get All Brands',
        operationId: 'getAllbrands',
        parameters: [],
        responses: {
            200: {
                description: 'All Active Brands',
                content: {
                    "application/json": {
                        schema: {
                            $ref: '#/components/schemas/Brand'
                        },
                    }
                },
            },
            404: {
                description: 'Not Found',
                content: {
                    "application/json": {
                        schema: {
                            $ref: '#/components/schemas/Error'
                        },
                    }
                },
            }
        },
    },
}