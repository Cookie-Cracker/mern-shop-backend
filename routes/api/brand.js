const express = require('express')
const { get } = require('mongoose')
const validateObjectId = require('../../middlewares/validateObjectId')
const Brand = require('../../models/brand.model')
const Category = require('../../models/category.model')
const Product = require('../../models/product.model')
const brandController = require('../../controllers/brand.controller')
const router = express.Router()



router.get('/', brandController.getAllBrands)
router.get('/search', brandController.searchBrands)
router.get('/q', brandController.queryBrands)
router.get('/:id', brandController.getById)
router.post('/', brandController.addNewBrand)
router.patch('/', brandController.updateBrand)
router.delete('/', brandController.deleteBrand)




// router.post('/add', async (req, res) => {
//   try {

//     const { name, description, isActive } = req.body
//     if (!description || !name) {
//       return res
//         .status(400)
//         .json({ error: 'You must enter description & name.' });
//     }
//     let brand = await Brand.findOne({ name: name })

//     if (brand)
//       return res.status(400).send('Brand already registered!!.')



//     brand = new Brand({
//       name,
//       description,
//       isActive
//     })

//     brand = await brand.save()
//     res.status(201).json({
//       success: true,
//       message: `Brand added successfully!!.`,
//       brand: brand
//     })
//   } catch (error) {
//     res.status(400).json({
//       error: 'Your request could not be processed. Please try again.'
//     });
//   }


// })

// router.get('/list', async (req, res) => {
//   try {
//     const brands = await Brand.find({
//       isActive: true
//     }).select('-__v');
//     // }).populate('merchant', 'name');

//     res.status(200).json({
//       brands
//     });
//   } catch (error) {
//     res.status(400).json({
//       error: 'Your request could not be processed. Please try again.'
//     });
//   }
// });

// router.get('/', async (req, res) => {

// })

// router.get('/:id', [validateObjectId], async (req, res) => {
//   try {
//     const brandId = req.params.id
//     console.log('GET ID')
//     console.log('brandId', brandId)
//     const brandDoc = await Brand.findById(brandId)
//     // .populate('merchant','_id');
//     console.log('brandDoc', brandDoc)
//     if (!brandDoc)
//       return res.status(404).json({
//         message: `Cannot find brand with id: ${brandId}`
//       })

//     res.status(200).json({
//       brand: brandDoc
//     })

//   } catch (error) {

//     console.log('error', error)
//     res.status(400).json({
//       error: 'Your request could not be processed. Please try again.'
//     });
//   }
// })

// router.delete(
//   '/delete/:id',
//   [validateObjectId],
//   // auth,
//   // role.check(ROLES.Admin),
//   async (req, res) => {
//     try {
//       const brandId = req.params.id;
//       // await deactivateMerchant(brandId);
//       const brand = await Brand.deleteOne({ _id: brandId });
//       console.log('brand', brand)
//       res.status(200).json({
//         success: true,
//         message: `Brand has been deleted successfully!`,
//         brand
//       });
//     } catch (error) {
//       res.status(400).json({
//         error: 'Your request could not be processed. Please try again.'
//       });
//     }
//   }
// );
module.exports = router
