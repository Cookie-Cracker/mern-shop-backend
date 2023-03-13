module.exports = {
    get: {
        tags: ['Brands'],
        description: "Get a brand by Id",
        operationId: "getBrandById",
        parameters: [
            {
                name: "id",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/MongoObjectId"
                },
                required: true,
                description: "A single brand id"
            }
        ],
        responses: {
            '200': {
                description: "Brand is Obtained.",
                content: {
                    'application/json': {
                        schema: {
                            $ref: "#/components/schemas/Brand"
                        }
                    }
                }
            },
            '400': {
                description: "Bad Request. ID?",
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Error',
                            example: {
                                message: "Not Provided or invalid ID",
                                internal_code: "Invalid id"
                            }
                        }
                    }
                }
            },
            '404': {
                description: "Brand is not found",
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Error',
                            example: {
                                message: "Cannot find brand with id:",
                                internal_code: "Invalid id"
                            }
                        }
                    }
                }
            }
        }
    }
}