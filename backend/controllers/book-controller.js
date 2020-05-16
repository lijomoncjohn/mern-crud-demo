const { validationResult } = require('express-validator');

const Book = require('../models/book-model')
const errorModel = require('../utils/custom-error')

const addBook = async(req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return next(
            new errorModel('Invalid payload, please check the inputs.', 422)
        );
    }

    const { title, description, author } = req.body

    const addedBook = new Book({
        title,
        description,
        author
    })

    try {
        await addedBook.save();
    } catch (error) {
        const err = new errorModel('Creating place failed, please try again.', 500);
        console.log(error);
        return next(err);
    }

    res.status(201).json({
        success: true,
        message: 'created new book',
        book: addedBook 
    });
}

const getAllBooks = async(req, res, next) => {
    let books
    try {
        books = await Book.find()
    } catch (error) {
        const err = new errorModel(
            'fetching books failed, try again later.',
            500
        )
        return next(err)
    }
    if (books.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'no books found, try again later'
        })
    }
    return res.status(200).json({
        success: true,
        message: 'books data found',
        books: books
    })
}

const editBook = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return next(
            new errorModel('Invalid payload, please check the inputs.', 422)
        );
    }

    const { title, description, author } = req.body
    const bookId = req.params.bid

    let book
    try {
        book = await Book.findById(bookId)
        console.log(book);
        
    } catch (error) {
        const err = new errorModel('fetching books failed, try again later.', 500)
        return next(err);
    }

    if(!book) {
        return res.status(400).json({
            success: false,
            message: 'Could not find book for this id'
        })
    }

    book.title = title
    book.description = description
    book.author = author

    try {
        await book.save()
    } catch (error) {
        console.log(error)
        
        const err = new errorModel('Something went wrong, try again later.',500)
        return next(err);
    }

    res.status(200).json({
        success: true,
        message: "Successfully updated book details",
        book: book
    })
}

const deleteBook = async(req, res, next) => {
    const bookId = req.params.bid
    let book
    try {
        book = await Book.findById(bookId)
    } catch (error) {
        const err = new errorModel('fetching books failed, try again later.',500)
        return next(err);
    }

    if(!book) {
        return res.status(400).json({
            success: false,
            message: 'Could not find book for this id'
        })
    }

    try {
        await book.remove()
    } catch (error) {
        const err = new errorModel('fetching books failed, try again later.',500)
        return next(err);
    }

    res.status(200).json({
        success: true,
        message: 'book details deleted successfully'
    })
}

exports.addBook = addBook
exports.getAllBooks = getAllBooks
exports.editBook = editBook
exports.deleteBook = deleteBook