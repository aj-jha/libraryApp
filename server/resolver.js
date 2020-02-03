const queryResolvers = require("./resolvers/query/queryResolvers");
const mutationResolvers = require("./resolvers/mutation/mutationResolvers");
const bookResolvers = require("./resolvers/book/bookResolvers");
const userResolvers = require("./resolvers/user/userResolver");
const libraryResolver = require("./resolvers/library/libraryResolvers");

module.exports = {
  ...queryResolvers,
  ...mutationResolvers,
  ...bookResolvers,
  ...userResolvers,
  ...libraryResolver
};

// resolver carries out/interacts with the database
// GraphQL query = get request
// module.exports = {
//   Query: {
//     async getAllLibraries(parent, args, context, info) {
//       const getLibraryQuery = {
//         text: "SELECT * FROM libraryapp.libraries"
//       };
//       const getLibraryResults = await context.postgres.query(getLibraryQuery);
//       return getLibraryResults.rows;
//     },
//     getLibrary(parent, args, context, info) {
//       args.id;
//     },

//     async getInventory(parent, { library_id, book_id }, { postgres }, info) {
//       console.log("getting Inventory...");
//       const getInventoryQuery = {
//         text: "SELECT * FROM libraryapp.books WHERE library_id=$1 AND id=$2",
//         values: [library_id, book_id]
//       };
//       const getInventoryResults = await postgres.query(getInventoryQuery);
//       console.log(getInventoryResults.rows);
//       return getInventoryResults.rows;
//     },

//     async getLent(parent, args, { postgres }, info) {
//       const displayLentQuery = {
//         text: "SELECT * FROM libraryapp.books WHERE status = 'Lent'"
//       };

//       const displayLentResult = await postgres.query(displayLentQuery);
//       console.log(displayLentResult);
//       return displayLentResult.rows;
//     }
//   },

//   // Mutations

//   Mutation: {
//     async borrowBook(parent, args, { postgres }, info) {
//       console.log("borrowBook");
//       const borrowBooksQuery = {
//         text: `UPDATE libraryapp.books B
//             SET status='Lent', borrower_id=$1
//             FROM libraryapp.libraries L
//             WHERE B.library_id = L.id
//             AND B.id=$2
//             AND B.status='Available'
//             AND L.open=true
//             RETURNING *`,
//         values: [args.borrower_id, args.id]
//       };
//       const borrowBooksResult = await postgres.query(borrowBooksQuery);
//       console.log(args.id);
//       console.log(args.borrower_id);
//       console.log(borrowBooksResult);
//       return borrowBooksResult.rows[0];
//     },
//     async returnBook(parent, { id }, { postgres }, info) {
//       console.log("return book");
//       const returnBookQuery = {
//         text:
//           "UPDATE libraryapp.books SET status = 'Available', borrower_id = null WHERE id = $1 AND status = 'Lent' RETURNING *",
//         values: [id]
//       };
//       console.log(id);
//       const returnBookResult = await postgres.query(returnBookQuery);
//       return returnBookResult.rows[0];
//     },
//     async addBook(parent, { title, author, library_id }, { postgres }, info) {
//       const addBookQuery = {
//         text:
//           "INSERT INTO libraryapp.books (title, author, library_id) VALUES ($1, $2, $3) RETURNING *",
//         values: [title, author, parseInt(library_id)]
//       };

//       const addBookResult = await postgres.query(addBookQuery);
//       console.log(addBookResult);
//       return addBookResult.rows[0];
//     },
//     async toggleOpen(parent, { library_id }, { postgres }, info) {
//       const openCloseQuery = {
//         text:
//           "UPDATE libraryapp.libraries SET open = NOT open Where id = $1 RETURNING*",
//         values: [library_id]
//       };
//       // console.log(req.body.id);
//       const openCloseResult = await postgres.query(openCloseQuery);
//       console.log(openCloseResult);
//       return openCloseResult.rows[0];
//     }
//   },
//   // resolver for book type. Book type is required as a return output in Schema. This provides graphQL instructions on how to pull data on Book Type
//   Book: {
//     async library(parent, args, { postgres }, info) {
//       const libraryInfoQuery = {
//         text: "SELECT * FROM libraryapp.libraries WHERE id=$1",
//         values: [parent.library_id]
//       };
//       const libraryInfoResult = await postgres.query(libraryInfoQuery);
//       console.log(libraryInfoResult);
//       return libraryInfoResult.rows[0];
//     },
//     async borrower(parent, args, { postgres }, info) {
//       const userInfoQuery = {
//         text: "SELECT * FROM libraryapp.users WHERE id=$1",
//         values: [parent.borrower_id]
//       };
//       const userInfoResult = await postgres.query(userInfoQuery);
//       console.log(userInfoResult);
//       return userInfoResult.rows[0];
//     }
//   }
// };
