const validator = require("validator");

class BookHandler {
  constructor(bookService) {
    this.bookService = bookService;
  }

  getBooks = async (req, res) => {
    try {
      const result = await this.bookService.getBooks();
      if (result.statusCode != 200) {
        return res.status(result.statusCode).json({ message: result.message });
      }
      return res.status(200).json({ message: "success", data: result.data });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  };

  createBookHandler = async (req, res) => {
    try {
      const errorMessages = [];
      const validate = ["title", "author", "stock"];

      validate.map((x) => {
        if (
          !req.body[x] ||
          req.body[x] === "" ||
          validator.isEmpty(`${req.body[x]}`)
        ) {
          errorMessages.push(`${x} cannot be empty`);
        }
      });

      if (errorMessages.length > 0) {
        return res.status(400).json({ message: errorMessages });
      }

      if (isNaN(req.body.stock)) {
        return res.status(400).json({ message: "stock must be number" });
      }

      let book = {
        title: req.body.title,
        author: req.body.author,
        stock: req.body.stock,
      };

      const result = await this.bookService.addBook(book);

      if (result.statusCode != 200) {
        return res.status(result.statusCode).json({ message: result.message });
      }

      return res.status(200).json({ message: "success", data: result.data });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error });
    }
  };
}

module.exports = BookHandler;
