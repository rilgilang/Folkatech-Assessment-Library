class BorrowerService {
  constructor(bookRepo, borrowerRepo, userConnector, kafkaBroker) {
    this.bookRepo = bookRepo;
    this.borrowerRepo = borrowerRepo;
    this.userConnector = userConnector;
    this.kafkaBroker = kafkaBroker;
  }
  getBorrowedBook = async (id) => {
    const data = await this.borrowerRepo.findAll(id);
    return { message: "success", data: data, statusCode: 200 };
  };

  borrowBook = async (params) => {
    const { user_id, book_id } = params;
    const userInfo = await this.userConnector.getUserInfo(user_id);

    if (userInfo.statusCode != 200) {
      return { message: "error", statusCode: 500 };
    }

    if (userInfo.data == null) {
      return { message: "user not found", statusCode: 404 };
    }

    if (userInfo.data.currentBorrow >= userInfo.data.maxAllowedBorrow) {
      return {
        message: `user only can borrow maximum ${userInfo.data.maxAllowedBorrow} books`,
        statusCode: 422,
      };
    }

    const bookValid = await this.bookRepo.findOneById(book_id);

    if (!bookValid) {
      return {
        message: `books not found or id is not valid`,
        statusCode: 400,
      };
    }

    let borrower = {
      userId: user_id,
      bookId: book_id,
    };

    const addBorrower = await this.borrowerRepo.addBorrower(borrower);

    this.kafkaBroker.publish("borrow", user_id);

    // const result = await this.bookRepo.addBook(bookData);
    return { message: "success", data: addBorrower, statusCode: 200 };
  };
}

module.exports = BorrowerService;
