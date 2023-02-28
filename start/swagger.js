const swaggerUi = require('swagger-ui-express')

swaggerDoc = require("../swagger.json")


module.exports = (app) => {
    app.use('/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDoc)
    )
}