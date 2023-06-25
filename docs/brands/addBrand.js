module.exports = {
    post: {
        tags: ['Brands'],
        description: 'Add New Brand',
        operationId: 'addNewBrand',
        parameters: [],
        requestBody: {
            content: {
                'application-json': {
                    schema: {
                        $ref: '#/components/schemas/NewBrand'
                    }
                }
            }
        },
        responses: {
            '201': {
                description: 'Brand Created',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Brand'
                        }
                    }
                }

            },
            '400': {
                description: 'You must enter description & name.',
            },
            '409': {
                description: 'Brand already registered'
            },



        }
    }
}