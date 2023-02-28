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

// Brand Schema
const BrandSchema = new Schema({
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
    data: Buffer,
    contentType: String
  },
  description: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  merchant: {
    type: Schema.Types.ObjectId,
    ref: 'Merchant',
    default: null
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

BrandSchema.plugin(mongoosePaginate)
const Brand = mongoose.model('Brand', BrandSchema);

module.exports = Brand