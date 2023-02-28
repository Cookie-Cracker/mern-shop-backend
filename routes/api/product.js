const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const Product = require('../../models/product.model');
const productController = require('../../controllers/product.controller')
const upload = require('../../upload');

const router = express.Router();

router.get('/', productController.getAllProducts)
router.get('/bybrand', productController.productsByBrand)

router.post('/',
  upload.single('image'),
  productController.addNewProduct
)


// router.post('/add',
//   upload.single('image'),
//   async (req, res) => {
//     try {
//       const { sku, name, description, quantity, price, taxable, isActive, brand } = req.body
//       const image = req.file.path

//       if (!sku) {
//         return res.status(400).json({ error: 'You must enter sku.' });
//       }

//       if (!description || !name) {
//         return res
//           .status(400)
//           .json({ error: 'You must enter description & name.' });
//       }

//       if (!quantity) {
//         return res.status(400).json({ error: 'You must enter a quantity.' });
//       }

//       if (!price) {
//         return res.status(400).json({ error: 'You must enter a price.' });
//       }

//       const foundProduct = await Product.findOne({ sku });

//       if (foundProduct) {
//         return res.status(400).json({ error: 'This sku is already in use.' });
//       }
//       const product = new Product({
//         sku,
//         name,
//         description,
//         quantity,
//         price,
//         taxable,
//         isActive,
//         brand,
//         image
//       });

//       const savedProduct = await product.save();

//       res.status(200).json({
//         success: true,
//         message: `Product has been added successfully!`,
//         product: savedProduct
//       });

//     } catch (error) {
//       return res.status(400).json({
//         error: 'Your request could not be processed. Please try again.'
//       });
//     }
//   })


module.exports = router