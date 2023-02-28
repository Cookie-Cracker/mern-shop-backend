const Product = require('../models/product.model')
const Brand = require('../models/brand.model')
const Prduct = require('../models/product.model')

const getAllProducts = async (req, res) => {

    const products = await Product.find().select('-__v').lean()
    // if (!products?.length) {
    //     return res.status(200).json({ message: 'No products found' })
    // }
    res.json(products)

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

const deactivateProduct = async (req, res) => {

}


module.exports = {
    getAllProducts,
    addNewProduct,
    updateProduct,
    productsByBrand,
    deactivateProduct

}
