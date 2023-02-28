const mongoose = require("mongoose");
const Joi = require("joi");

const roleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        
            required: true,
            trim: true,
        } 
        
    }
)

const validateRole = (role) => {
    const schema = Joi.object({
        name: Joi
        .string()
        .label('Role')
        .trim()
        .min(5)
        .max(16)
        .required()
    })

    return schema.validate(role, schema)
}

const Role = mongoose.model('Role', roleSchema)

module.exports = Role
module.exports.validate = validateRole
