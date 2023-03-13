const basicInfo = require('./basicInfo');
const servers = require('./servers');
const components = require('./components');
const tags = require('./tags');
const brands = require('./brands')
module.exports = {
    ...basicInfo,
    ...servers,
    ...tags,
    ...components,
    ...brands

}