const route = require('express').Router()
route.use('/batches',require('./batch'))
route.use('/courses',require('./course'))
route.use('/teachers',require('./teacher'))
route.use('/subjects',require('./subject'))
route.use('/students',require('./student'))
route.use('/lectures',require('./lecture'))

exports =  module.exports={
    route
}