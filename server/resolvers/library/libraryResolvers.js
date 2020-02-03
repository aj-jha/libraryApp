module.exports = {
  Library: {
    async libraryUsers(parent, args, { postgres }, info) {
      const libraryUsersQuery = {
        text:
          "SELECT * FROM libraryapp.libraries_users LU INNER JOIN libraryapp.users U ON LU.user_id = U.id WHERE LU.library_id=$1",
        values: [parent.id]
      };
      console.log(parent.id);
      const libraryUsersResults = await postgres.query(libraryUsersQuery);
      console.log(libraryUsersResults);
      return libraryUsersResults.rows;
    }
  }
};
