const swaggerUi = require('swagger-ui-express')

const docs = require('../docs')

swaggerDoc = require("../swagger.json")


module.exports = (app) => {
    app.use('/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(docs)
    )
}