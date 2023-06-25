const swaggerUi = require('swagger-ui-express')

const docs = require('../docs')

swaggerDoc = require("../swagger.json")

var options = {
    explorer: true,
    swaggerOptions: {
        authAction: {
            JWT: {
                name: 'JWT',
                schema: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization',
                    description: ''
                },
                value: 'Bearer <my own JWT token>'
            }
        }
    }
}
module.exports = (app) => {
    app.use('/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(docs, options)
    )
}