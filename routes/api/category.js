const express = require('express')
const validateObjectId = require('../../middlewares/validateObjectId')
const Brand = require('../../models/brand.model')
const Category = require('../../models/category.model')

const router = express.Router()
router.post('/add',
    // auth,
    // role.check(ROLES.Admin),
    async (req, res) => {
        const name = req.body.name;
        const description = req.body.description;
        const products = req.body.products;
        const isActive = req.body.isActive;

        if (!description || !name) {
            return res
                .status(400)
                .json({ error: 'You must enter description & name.' });
        }
        let category = await Category.findOne({ name: name })
        if (category)
            return res.status(400).send('Category already registered!!.')

        category = new Category({
            name,
            description,
            products,
            isActive
        });

        category.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: 'Your request could not be processed. Please try again.'
                });
            }

            res.status(200).json({
                success: true,
                message: `Category has been added successfully!`,
                category: data
            });
        });
    });

router.get('/list', async (req, res) => {
    try {
        const categories = await Category.find({ isActive: true });
        res.status(200).json({
            categories
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
});

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json({
            categories
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;

        const categoryDoc = await Category.findOne({ _id: categoryId })
            .populate({
                path: 'products',
                select: 'name'
            });

        if (!categoryDoc) {
            return res.status(404).json({
                message: 'No Category found.'
            });
        }

        res.status(200).json({
            category: categoryDoc
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
});

router.put('/:id',
    // auth,
    // role.check(ROLES.Admin),
    async (req, res) => {

    });


    // TODO: Activate /Deactivate Category
router.put('/:id/active',
    //    auth, 
    //    role.check(ROLES.Admin),
    async (req, res) => {

    });


router.delete(
    '/delete/:id',
    // auth,
    // role.check(ROLES.Admin),
    async (req, res) => {
        try {
            const product = await Category.deleteOne({ _id: req.params.id });

            res.status(200).json({
                success: true,
                message: `Category has been deleted successfully!`,
                product
            });
        } catch (error) {
            res.status(400).json({
                error: 'Your request could not be processed. Please try again.'
            });
        }
    }
);

module.exports = router
