const getAllBrands = require("./getAllBrands");
const getBrandById = require('./getBrand')
const addBrand = require('./addBrand')
const search = require('./search')

module.exports = {
    paths: {
        '/brand': {
            ...getAllBrands,
            ...addBrand


        },
        '/brand/{id}': {
            ...getBrandById,

        },
        // 'api/brand/{search}': {
        //     ...search,

        // },

    }
}