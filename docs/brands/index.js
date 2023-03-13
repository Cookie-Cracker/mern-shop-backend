const getAllBrands = require("./getAllBrands");
const getBrandById = require('./getBrand')
const search = require('./search')

module.exports = {
    paths: {
        '/brand': {
            ...getAllBrands,

        },
        '/brand/{id}': {
            ...getBrandById,

        },
        // 'api/brand/{search}': {
        //     ...search,

        // },

    }
}