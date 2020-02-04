const { gql } = require("apollo-server-express");
// schema.js is the rules/structure file for resolver.js
//! after variable type means required. ! in the [Library = required] -> returns null or array with some value ! outside square brackets will GQL require to return an array.
module.exports = gql`
  type Query {
    getAllLibraries: [Library]!
    getLibrary(id: ID!): Library
    getInventory(library_id: ID!): [Book]!
    getLent: [Book]!
    getUsers(library_id: ID): [User]!
    getMyLibraryInventory: [Book]!
  }

  type Mutation {
    borrowBook(book_id: ID!): borrowBookResponse!
    returnBook(book_id: ID!): borrowBookResponse!
    addBook(title: String!, author: String!, library_id: ID!): addBookResponse!
    toggleOpen(library_id: ID!): LibraryOperationsResponse!
    addLibrary(name: String!, address: String!): LibraryOperationsResponse!
    signup(input: SignupInput!): SignupResponse!
    login(email: String!, password: String!): SignupResponse!
    banUser(id: ID!): userOpsResponse
    removeBook(id: ID!): addBookResponse!
    joinLibrary(library_id: ID!): Library!
    leaveLibrary(library_id: ID!): Library!
  }

  input SignupInput {
    email: String!
    password: String!
    name: String!
    address: String
    library_id: ID!
  }
  type userOpsResponse {
    user: User
    error: String
  }
  type LibraryOperationsResponse {
    library: Library
    error: String
  }

  type SignupResponse {
    user: User
    csrfToken: String
    error: String
  }

  type addBookResponse {
    book: Book
    error: String
  }

  type borrowBookResponse {
    book: Book
    error: String
  }

  type User {
    id: ID!
    email: String!
    password: String!
    name: String!
    role: String!
    address: String
    borrowedBooks: [Book]!
    banned: Boolean!
  }

  type Library {
    id: ID!
    open: Boolean!
    name: String!
    address: String!
    libraryUsers: [User]!
  }

  type Book {
    id: ID!
    title: String!
    author: String!
    library: Library!
    status: String!
    borrower: User
  }
`;
