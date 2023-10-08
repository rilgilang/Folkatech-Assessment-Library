const express = require("express");
const router = express.Router();

const BookRepo = require("./repository/bookRepo");
const BookService = require("./service/bookService");
const BookHandler = require("./handlers/bookHandler");
const BorrowerHandler = require("./handlers/borrowerHandler");
const BorrowRepo = require("./repository/borrowRepo");
const BorrowerService = require("./service/borrowerService");
const UserConnector = require("./connector/userConnector");
const { kafkaBootStrap } = require("./bootstrap/kafka");
const KafkaBroker = require("./boker/kafka");

const { checkApiKey } = require("./middleware/apiKey");

//broker
const broker = new KafkaBroker(kafkaBootStrap);

//connector
const userConnector = new UserConnector();

//repo
const bookRepo = new BookRepo();
const borrowerRepo = new BorrowRepo();

//service
const bookService = new BookService(bookRepo);
const borrowerService = new BorrowerService(
  bookRepo,
  borrowerRepo,
  userConnector,
  broker
);

//handlers
const bookHandler = new BookHandler(bookService);
const borrowerHandler = new BorrowerHandler(borrowerService);

router.post("/book/add", checkApiKey, bookHandler.createBookHandler);

router.get("/books", checkApiKey, bookHandler.getBooks);

router.post("/borrow", checkApiKey, borrowerHandler.borrowBook);

router.get("/borrow/:id", checkApiKey, borrowerHandler.borrowedBook);

module.exports = router;
