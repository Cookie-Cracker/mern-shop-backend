const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const {Schema} = mongoose

const options = {
    separator: '-',
    lang: 'en',
    truncate: 120
}

mongoose.plugin(slug, options)

const CategorySchema = new Schema({
    // _id: {
    //   type: Schema.ObjectId,
    //   auto: true
    // },
    name: {
      type: String,
      trim: true
    },
    slug: {
      type: String,
      slug: 'name',
      unique: true
    },
    // image: {
    //   data: Buffer,
    //   contentType: String
    // },
    description: {
      type: String,
      trim: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      }
    ],
    updated: Date,
    created: {
      type: Date,
      default: Date.now
    }
  });

  const Category = mongoose.model("Category", CategorySchema)
  
//TODO: Category JOI Validate
  
  module.exports = Category