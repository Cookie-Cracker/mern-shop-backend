const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2')

const options = {
  separator: '-',
  lang: 'en',
  truncate: 120
};

mongoose.plugin(slug, options);

// Product Schema
const ProductSchema = new Schema({
  sku: {
    type: String
  },
  name: {
    type: String,
    trim: true
  },
  slug: {
    type: String,
    slug: 'name',
    unique: true
  },
  image: {
    type: String
  },
  // imageUrl: {
  //   type: String
  // },
  // imageKey: {
  //   type: String
  // },
  description: {
    type: String,
    trim: true
  },
  quantity: {
    type: Number
  },
  price: {
    type: Number
  },
  taxable: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: 'Brand',
    default: null
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});


ProductSchema.plugin(mongoosePaginate)
const Product = mongoose.model('Product', ProductSchema);

//TODO: Product JOI Validate

module.exports = Product
