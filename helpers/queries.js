const mongoose = require('mongoose')

exports.getProductsQuery = (name, minPrice, maxPrice) => {

    minPrice = Number(minPrice)
    maxPrice = Number(maxPrice)

    const nameFilter =
        name
            ? { name: { $regex: new RegExp(name), $options: 'i' } }
            : {}

    const priceFilter =
        minPrice && maxPrice
            ? { price: { $gte: minPrice, $lte: maxPrice } }
            : {}

    const basicQuery = {
        isActive: true,
        price: priceFilter.price,
        name: nameFilter.name
    }



    return basicQuery

}