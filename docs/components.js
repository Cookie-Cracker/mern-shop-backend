
const mongoose = require('mongoose');
const mongooseToSwagger = require('mongoose-to-swagger');
const Brand = require('../models/brand.model')


const Error = mongoose.model('Error', {
    message: {
        type: String,
    },
});
const MongoObjectId = mongoose.model('Id', {
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        description: 'Hexadecimal string value for the new ObjectId(507f1f77bcf86cd799439011)',

    }
})

const brandOption = {
    omitFields: ['_id', 'slug', 'image', 'merchant', 'updated', 'created'],
}
const brandSchema = mongooseToSwagger(Brand, { omitFields: ['_id'] })
const newBrandSchema = mongooseToSwagger(Brand, brandOption)
const errorSchema = mongooseToSwagger(Error, { omitFields: ['_id'] })
const idSchema = mongooseToSwagger(MongoObjectId)

module.exports = {


    components: {
        schemas: {
            Brand: brandSchema,
            NewBrand: newBrandSchema,
            Error: errorSchema,
            MongoObjectId: idSchema

        },
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',

            }
        }
    }
}