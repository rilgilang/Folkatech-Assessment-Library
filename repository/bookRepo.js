const hashPassword = require("../helper/passwordSalt");
const { book } = require("../models/models");

class BookRepo {
  findAll = async () => {
    const result = await book.find();
    return result;
  };

  findOneById = async (id) => {
    const result = await book.findOne({ _id: id });
    return result;
  };

  addBook = async (bookData) => {
    const newBook = await book.create(bookData);
    const result = await book.findOne({
      _id: newBook._id,
    });

    return result;
  };
}

module.exports = BookRepo;
