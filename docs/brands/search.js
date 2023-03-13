module.exports = {
    get: {
        tags: ['Brands'],
        description: "Paginated query for brands",
        operationId: "search",
        parameters: [
            {
                brand: "id",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/MongoObjectId"
                },
                required: true,
                description: "A single brand id"
            },

        ],
        responses: {
            '200': {
                description: "Todo is obtained",
                content: {
                    'application/json': {
                        schema: {
                            $ref: "#/components/schemas/Brand"
                        }
                    }
                }
            },
            '404': {
                description: "Todo is not found",
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Error',
                            example: {
                                message: "We can't find the todo",
                                internal_code: "Invalid id"
                            }
                        }
                    }
                }
            }
        }
    }
}