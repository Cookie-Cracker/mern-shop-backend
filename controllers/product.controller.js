const Product = require('../models/product.model')
const Brand = require('../models/brand.model')
const Prduct = require('../models/product.model')
const { labels } = require('../helpers/customPaginatedLabels')
const { getProductsQuery } = require('../helpers/queries')
const getPagination = require('../utils/getPagination')
const { query } = require('express')


const getAllProducts = async (req, res) => {


    const products = await Product.find().select('-__v').lean()

    res.json(products)

}

const queryProducts = async (req, res) => {
    const myCustomLabels = {
        totalDocs: 'itemCount',
        docs: 'itemsList',
        limit: 'perPage',
        page: 'currentPage',
        nextPage: 'next',
        prevPage: 'prev',
        totalPages: 'pageCount',
        pagingCounter: 'slNo',
        meta: 'paginator',
    };
    let { name, minPrice, maxPrice, isActive, page, size } = req.query

    minPrice = minPrice <= 0 || !minPrice ? 0 : minPrice
    page = page < 0 ? 0 : 1

    const filterName =
        name
            ? { name: { $regex: new RegExp(name), $options: 'i' } }
            : {}
    const filterPrice =
        minPrice && maxPrice
            ? { price: { $gte: minPrice, $lte: maxPrice } }
            : {}


    const min = { price: { $gte: minPrice } }
    const max = { price: { $lte: maxPrice } }


    let q = {
        price: filterPrice.price,

    }

    let queryOK = { $and: [filterName, min, max] }


    const { limit, offset } = getPagination(page, size)
    Product.paginate(queryOK, { limit, offset, customLabels: myCustomLabels, sort: { name: 1 } })
        .then((data) => {

            res.json(data)
        })

}

const addNewProduct = async (req, res) => {

    const { sku, name, description, quantity, price, taxable, isActive, brand } = req.body
    const image = req.file.path

    if (!sku) {
        return res.status(400).json({ message: 'You must enter sku.' });
    }

    if (!description || !name) {
        return res
            .status(400)
            .json({ message: 'You must enter description & name.' });
    }

    if (!quantity) {
        return res.status(400).json({ message: 'You must enter a quantity.' });
    }

    if (!price) {
        return res.status(400).json({ message: 'You must enter a price.' });
    }

    const foundProduct = await Product.findOne({ sku });

    if (foundProduct) {
        return res.status(400).json({ message: 'This sku is already in use.' });
    }
    const product = new Product({
        sku,
        name,
        description,
        quantity,
        price,
        taxable,
        isActive,
        brand,
        image
    });

    const savedProduct = await product.save();

    res.status(200).json({ product: savedProduct });

}

const updateProduct = async (req, res) => {

}
const productsByBrand = async (req, res) => {
    const { brandId } = req.body

    const brand = await Brand.findOne({ _id: brandId, isActive: true })

    if (!brand) return res.status(404).json({ message: `Cant't find brand.` })
    const products = await Product.aggregate([
        {
            $match: {
                isActive: true,
                brand: brand._id
            }
        }
    ])


    res.status(200).json(products)
}
const productsByBrandPaginated = async (req, res) => {

    const { brandId } = req.body
    let page = 1
    let size = 5

    const brand = await Brand.findOne({ _id: brandId, isActive: true })

    if (!brand) return res.status(404).json({ message: `Cant't find brand.` })

    let q = { brand: brand._id }
    console.log('q', q)
    const { limit, offset } = getPagination(page, size)
    Product.paginate(q, { limit, offset, customLabels: labels, sort: { name: 1 } })
        .then((data) => {
            res.json(data)
        })

    // res.status(200).json(products)
}

const deactivateProduct = async (req, res) => {

}


module.exports = {
    getAllProducts,
    queryProducts,
    addNewProduct,
    updateProduct,
    productsByBrand,
    productsByBrandPaginated,
    deactivateProduct

}
