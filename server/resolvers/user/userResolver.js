module.exports = {
  User: {
    async borrowedBooks({ id }, args, { postgres }, info) {
      const borrowedBooksQuery = {
        text: "SELECT * FROM libraryapp.books WHERE borrower_id	=$1",
        values: [id]
      };
      console.log(id);
      const borrowedBooksResults = await postgres.query(borrowedBooksQuery);
      return borrowedBooksResults.rows;
    }
  }
};
