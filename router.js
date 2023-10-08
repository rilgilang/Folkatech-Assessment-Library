const express = require("express");
const BookRepo = require("./repository/bookRepo");
const BookService = require("./service/bookService");
const BookHandler = require("./handlers/bookHandler");
const router = express.Router();

//repo
const bookRepo = new BookRepo();

//service
const bookService = new BookService(bookRepo);

//handlers
const bookHandler = new BookHandler(bookService);

router.post("/book/add", bookHandler.createBookHandler);

router.get("/books", bookHandler.getBooks);

module.exports = router;
