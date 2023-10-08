class BookService {
  constructor(bookRepo) {
    this.bookRepo = bookRepo;
  }
  getBooks = async () => {
    const data = await this.bookRepo.findAll();
    return { message: "success", data: data, statusCode: 200 };
  };

  addBook = async (bookData) => {
    const result = await this.bookRepo.addBook(bookData);
    return { message: "success", data: result, statusCode: 200 };
  };
}

module.exports = BookService;
