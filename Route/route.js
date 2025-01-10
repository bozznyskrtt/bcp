const express = require('express');
const router =  express.Router();
const api = require('./../dbapi/crud');

console.log(api);

router.route('/')
.get(api.readData)
.post(api.validate,api.insertData)

router.route('/:id')
.get(api.getData)
.patch(api.updateData)
.delete(api.deleteData)

module.exports = router;