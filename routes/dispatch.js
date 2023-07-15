const express = require('express');
const { getDispathById, listDispatch, storeDispatch, updateDispatch, deleteDispatch } = require('../controllers/dispatch.controller.js');
const { isVerified } = require('../middleware/isVerified.js');

const router = express.Router();

router.get('/dispatch', isVerified, listDispatch);
router.get('/dispatch/:id', isVerified, getDispathById);
router.post('/dispatch', isVerified, storeDispatch);
router.put('/dispatch/:id', isVerified, updateDispatch);
router.delete('/dispatch/:id', isVerified, deleteDispatch);

module.exports = router