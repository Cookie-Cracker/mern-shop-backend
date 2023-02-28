const Brand = require('../models/brand.model')
const getPagination = require('../utils/getPagination')

const queryBrands = async (req, res) => {
    const { page, size, brand } = req.query
    console.log('brand', brand)

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
    const qByName =
        brand
            ? { name: { $regex: new RegExp(brand), $options: 'i' } }
            : {}


    const { limit, offset } = getPagination(page, size)
    Brand.paginate(qByName, { limit, offset, customLabels: myCustomLabels, sort: { name: 1 } })
        .then((data) => {
            res.json({
                data

            })
        })

}


const getAllBrands = async (req, res) => {
    try {
        const brands = await Brand.find({
            isActive: true
        }).select('-__v');

        res.json(brands);
    } catch (error) {
        res.status(400).json({
            message: 'Your request could not be processed. Please try again.'
        });
    }
}

const searchBrands = async (req, res) => {
    const { page, size, brand } = req.query
    console.log('brand', brand)

    const condition =
        brand
            ? { name: { $regex: new RegExp(brand), $options: 'i' } }
            : {}
    // const brands = await Brand.find({ "name": { $regex: /Ghost/, $options: 'i' } })
    const brands = await Brand.find(condition)
    console.log('brands', brands)
    return res.json(brands)
}
const getById = async (req, res) => {
    try {
        const brandId = req.params.id
        console.log('GET ID')
        console.log('brandId', brandId)
        const brandDoc = await Brand.findById(brandId).select('-__v')
        console.log('brandDoc', brandDoc)
        if (!brandDoc)
            return res.status(404).json({
                message: `Cannot find brand with id: ${brandId}`
            })

        res.status(200).json({
            brand: brandDoc
        })

    } catch (error) {

        console.log('error', error)
        res.status(400).json({
            message: 'Your request could not be processed. Please try again.'
        });
    }
}

const addNewBrand = async (req, res) => {

    try {

        const { name, description, isActive } = req.body
        if (!description || !name) {
            return res
                .status(400)
                .json({ message: 'You must enter description & name.' });
        }
        let brand = await Brand.findOne({ name: name })

        if (brand)
            return res.status(400).json({ message: 'Brand already registered!!.' })



        brand = new Brand({
            name,
            description,
            isActive
        })

        brand = await brand.save()
        res.status(201).json({
            brand
        })
    } catch (error) {
        res.status(400).json({
            message: 'Your request could not be processed. Please try again.'
        });
    }


}

const updateBrand = async (req, res) => {
    const { id, name, description, isActive } = req.body

    if (!id || !name || !description || typeof isActive !== 'boolean')
        return res.status(400).json({ message: 'All fields are required.' })


    const brand = await Brand.findById(id).exec()
    if (!brand) return res.status(400).json({ message: 'Brand not found.' })

    const duplicate = await Brand.findOne({ name }).lean().exec()
    if (duplicate && duplicate?._id.toString() !== id)
        return res.status(409).json({ message: 'Duplicate brand name' })

    brand.name = name
    brand.description = description
    brand.isActive = isActive
    brand.updated = new Date()

    const updateBrand = await brand.save()
    res.json(`(${updateBrand.name} was updated correctly.)`)

}
const deleteBrand = async (req, res) => {
    try {
        const { id } = req.body
        // await deactivateMerchant(brandId);
        if (!id) return res.status(400).json({ message: 'Brand ID Required.' })
        const brand = await Brand.deleteOne({ _id: id });
        console.log('brand', brand)
        res.status(200).json({ brand });
    } catch (error) {
        res.status(400).json({
            message: 'Your request could not be processed. Please try again.'
        });
    }
}


module.exports = {
    getAllBrands,
    queryBrands,
    searchBrands,
    getById,
    addNewBrand,
    updateBrand,
    deleteBrand
}