const validator = require("validator");

class BorrowerHandler {
  constructor(borrowerService) {
    this.borrowerService = borrowerService;
  }

  borrowBook = async (req, res) => {
    try {
      const errorMessages = [];

      const ObjectId = require("mongoose").Types.ObjectId;

      const validate = ["user_id", "book_id"];

      validate.map((x) => {
        if (
          !req.body[x] ||
          req.body[x] === "" ||
          validator.isEmpty(`${req.body[x]}`)
        ) {
          errorMessages.push(`${x} cannot be empty`);
        }
      });

      if (!ObjectId.isValid(req.body.user_id)) {
        return res.status(400).json({ message: "user_id is not valid" });
      }

      if (!ObjectId.isValid(req.body.book_id)) {
        return res.status(400).json({ message: "book_id is not valid" });
      }

      const result = await this.borrowerService.borrowBook(req.body);
      if (result.statusCode != 200) {
        return res.status(result.statusCode).json({ message: result.message });
      }
      return res.status(200).json({ message: "success", data: result.data });
    } catch (error) {
      console.log("error --> ", error);
      return res.status(500).json({ message: error });
    }
  };

  borrowedBook = async (req, res) => {
    try {
      const result = await this.borrowerService.getBorrowedBook(req.params.id);
      if (result.statusCode != 200) {
        return res.status(result.statusCode).json({ message: result.message });
      }
      return res.status(200).json({ message: "success", data: result.data });
    } catch (error) {
      console.log("error --> ", error);
      return res.status(500).json({ message: error });
    }
  };
}

module.exports = BorrowerHandler;
