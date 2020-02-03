module.exports = {
  Query: {
    async getAllLibraries(parent, args, context, info) {
      const getLibraryQuery = {
        text: "SELECT * FROM libraryapp.libraries"
      };
      const getLibraryResults = await context.postgres.query(getLibraryQuery);
      return getLibraryResults.rows;
    },
    getLibrary(parent, args, context, info) {
      args.id;
    },

    async getInventory(parent, { library_id }, { postgres }, info) {
      console.log("getting Inventory...");
      const getInventoryQuery = {
        text: "SELECT * FROM libraryapp.books WHERE library_id=$1",
        values: [library_id]
      };
      const getInventoryResults = await postgres.query(getInventoryQuery);
      console.log(getInventoryResults.rows);
      return getInventoryResults.rows;
    },

    async getLent(parent, args, { postgres }, info) {
      const displayLentQuery = {
        text: "SELECT * FROM libraryapp.books WHERE status = 'Lent'"
      };

      const displayLentResult = await postgres.query(displayLentQuery);
      console.log(displayLentResult);
      return displayLentResult.rows;
    },
    async getUsers(parent, { library_id }, { postgres }, info) {
      let getUsersQuery;
      if (library_id) {
        getUsersQuery = {
          text:
            "SELECT * FROM libraryapp.users U INNER JOIN libraryapp.libraries_users LU ON LU.user_id = U.id WHERE LU.library_id=$1",
          values: [library_id]
        };
      } else {
        getUsersQuery = {
          text: "SELECT * FROM libraryapp.users"
        };
      }

      const getUserResults = await postgres.query(getUsersQuery);
      return getUserResults.rows;
    }
  }
};
