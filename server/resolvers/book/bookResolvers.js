module.exports = {
  Book: {
    async library(parent, args, { postgres }, info) {
      const libraryInfoQuery = {
        text: "SELECT * FROM libraryapp.libraries WHERE id=$1",
        values: [parent.library_id]
      };
      const libraryInfoResult = await postgres.query(libraryInfoQuery);
      console.log(libraryInfoResult);
      return libraryInfoResult.rows[0];
    },
    async borrower(parent, args, { postgres }, info) {
      const userInfoQuery = {
        text: "SELECT * FROM libraryapp.users WHERE id=$1",
        values: [parent.borrower_id]
      };
      const userInfoResult = await postgres.query(userInfoQuery);
      console.log(userInfoResult);
      return userInfoResult.rows[0];
    }
  }
};
