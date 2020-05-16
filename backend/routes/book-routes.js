const express = require('express')
const router = express.Router()
const { check } = require('express-validator')

const bookController = require('../controllers/book-controller')

router.get('/', bookController.getAllBooks)

router.post('/', [
    check('title').not().isEmpty(),
    check('description').isLength({ min: 5 }),
    check('author').not().isEmpty()
], bookController.addBook)

router.patch('/:bid',[
    check('title').notEmpty(),
    check('description').isLength({ min: 10 }),
    check('author').not().isEmpty()
], bookController.editBook)

router.delete('/:bid', bookController.deleteBook)

module.exports = router