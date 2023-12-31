const { borrower } = require("../models/models");

class BorrowRepo {
  findAll = async (id) => {
    const result = await borrower.find({ userId: id });
    return result;
  };

  findOneById = async (id) => {
    const result = await borrower.findOne({ _id: id });
    return result;
  };

  addBorrower = async (borrowerData) => {
    const newBorrower = await borrower.create(borrowerData);
    const result = await borrower.findOne({
      _id: newBorrower._id,
    });

    return result;
  };
}

module.exports = BorrowRepo;
