class BorrowerService {
  constructor(borrowerService) {
    this.bookRepo = bookRepo;
  }
  getBorrowers = async () => {
    const data = await this.bookRepo.findAll();
    return { message: "success", data: data, statusCode: 200 };
  };

  borrowBook = async (bookData) => {
    const result = await this.bookRepo.addBook(bookData);
    return { message: "success", data: result, statusCode: 200 };
  };
}

module.exports = BookService;
