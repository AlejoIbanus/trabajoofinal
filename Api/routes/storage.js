const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadMiddleware = require('../utils/handleStorage')
const {createItems, getItem, getItems, updateItems, deleteItems} = require('../controllers/storage')
const {validatorGetItem} = require('../validators/storage')


router.get('/:id',validatorGetItem, getItem)



module.exports = router;