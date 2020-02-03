const express = require("express");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// cross origin requests - used to verify requests are coming from the internet

const { Pool } = require("pg");
const config = require("./config/default.json");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolver");
const authUtil = require("./utils");
require("dotenv").config(); // enables enviroment variables. Where we store sensitive variables/information that we don't want our source code to contain.

// apollo server is used to connect express & GraphQL
const postgres = new Pool(config.db);

const app = express();

const corsConfig = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: "GET, POST"
};

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("JWT_TOKEN_NAME", process.env.JWT_TOKEN_NAME);
app.use(cors(corsConfig));

console.log(process.env.JWT_SECRET); // shows enviroment variable of "Test"
app.set("JWT_SECRET", process.env.JWT_SECRET);
//apolloServer sets up a new server that takes in a configuration file

const apolloServer = new ApolloServer({
  context: ({ req }) => {
    return {
      app,
      req,
      postgres,
      authUtil
    };
  },
  typeDefs,
  resolvers
});

apolloServer.applyMiddleware({
  app,
  cors: corsConfig,
  uploads: true
});

app.listen(8080, () => {
  console.log(`>>Express is running on port 8080`);
  console.log(`GraphQL Playground: http://localhost:8080/graphql`);
});

// app.get("/", async (req, res) => {
//   const getLibraryQuery = {
//     text: "SELECT * FROM libraryapp.libraries"
//   };
//   const getLibraryResults = await postgres.query(getLibraryQuery);
//   console.log(getLibraryResults.rows);
//   // data is returned in the rows field in the results object.

//   // const libraryname;
//   // const libraryaddress;

//   // const addNewLibraryQuery = {
//   //   text:
//   //     "INSERT INTO libraryapp.libraries (name, address) VALUES ($1, $2) RETURNING *",
//   //     values: [libraryname,libraryaddress]
//   //     // $1 refers to the first variable in values []
//   // };

//   res.send(getLibraryResults.rows);
// });

// app.get("/inventory", async (req, res) => {
//   const getInventoryQuery = {
//     text: "SELECT * FROM libraryapp.books WHERE library_id=$1 AND id=$2",
//     values: [req.query.library_id, req.query.book_id]
//   };

//   const getInventoryResults = await postgres.query(getInventoryQuery);
//   console.log(getInventoryResults.rows);
//   res.send(getInventoryResults.rows);
// });

// app.post("/borrow", async (req, res) => {
//   const borrowBooksQuery = {
//     text: `UPDATE libraryapp.books B
//     SET status='lent', borrower_id=$1
//     FROM libraryapp.libraries L
//     WHERE B.library_id = L.id
//     AND B.id=$2
//     AND B.status='available'
//     AND L.open=true
//     RETURNING *`,
//     values: [req.body.borrower_id, req.body.id]
//   };
//   const borrowBooksResult = await postgres.query(borrowBooksQuery);
//   res.send(borrowBooksResult.rows[0]);
// });

// // app.post("/Name", (req, res) => {
// //   //   console.log("Request: ", req);
// //   //   res.send(data.name);
// //   console.log(req.body);
// //   data.name = req.body.name;
// //   console.log(data.name);
// //   res.send("done");
// // });

// app.post("/return", async (req, res) => {
//   const returnBookQuery = {
//     text:
//       "UPDATE libraryapp.books SET status = 'available', borrower_id = null WHERE id = $1 AND status = 'lent' RETURNING *",
//     values: [req.body.id]
//   };
//   const returnBookResult = await postgres.query(returnBookQuery);
//   console.log(req.body.library_id);
//   console.log(req.body.id);
//   // console.log(borrowBookResult);
//   res.send(returnBookResult.rows);
// });

// // function for interacting with database to addBook
// app.post("/addBook", async (req, res) => {
//   const addBookQuery = {
//     text:
//       "INSERT INTO libraryapp.books (title, author, library_id) VALUES ($1, $2, $3) RETURNING *",
//     values: [req.body.title, req.body.author, parseInt(req.body.library_id)]
//   };

//   const addBookResult = await postgres.query(addBookQuery);
//   console.log(addBookResult);

//   res.send(addBookResult.rows[0]);
// });

// app.post("/openClose", async (req, res) => {
//   const openCloseQuery = {
//     text:
//       "UPDATE libraryapp.libraries SET open = NOT open Where id = $1 RETURNING*",
//     values: [req.body.id]
//   };
//   // console.log(req.body.id);
//   const openCloseResult = await postgres.query(openCloseQuery);
//   console.log(openCloseResult);
//   res.send(openCloseResult.rows);
// });

// app.get("/lent", async (req, res) => {
//   const displayLentQuery = {
//     text: "SELECT * FROM libraryapp.books WHERE status = 'Lent'"
//   };

//   const displayLentResult = await postgres.query(displayLentQuery);
//   console.log(displayLentResult);
//   res.send(displayLentResult.rows);
// });

// app.get("/allData", (req, res) => {
//   console.log("Request: ", req);
//   res.send(data);
//   console.log("All Data Success");
// });

// // console.log("Hello World");
// // console.log("addddasdadsadsad");
