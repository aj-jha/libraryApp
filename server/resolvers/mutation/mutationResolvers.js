const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const saltRounds = 12;

module.exports = {
  Mutation: {
    async borrowBook(
      parent,
      { book_id },
      { app, req, postgres, authUtil },
      info
    ) {
      try {
        const borrower_id = authUtil.authenticate(app, req).userID; // saves authenticated ID in the borrower_id variable. .authenticate function returns userID.
        // console.log(book_id);
        // console.log(borrower_id);
        // console.log("borrowBook");

        const checkStatusQuery = {
          text: `SELECT * FROM libraryapp.books WHERE id=$1`,
          values: [book_id]
        };

        const borrowBooksQuery = {
          text: `UPDATE libraryapp.books B
        SET status='Lent', borrower_id=$1
        FROM libraryapp.libraries L
        INNER JOIN libraryapp.users U ON U.id = $1
        WHERE B.library_id = L.id
        AND B.id=$2
        AND B.status='Available'
        AND L.open=true
        AND U.banned=false
        RETURNING B.id, title, author, status,library_id,borrower_id;`,
          values: [borrower_id, book_id]
        };
        // console.log(borrower_id);
        // console.log(book_id);
        const checkStatusResult = await postgres.query(checkStatusQuery);

        if (!checkStatusResult.rows[0]) {
          return { error: "We don't have this book!" };
        }

        if (checkStatusResult.rows[0].status == "Lent") {
          return { error: "Book Has Already Been Lent" };
        }

        const borrowBooksResult = await postgres.query(borrowBooksQuery);
        console.log(borrowBooksResult);
        // return borrowBooksResult.rows[0];

        return { book: borrowBooksResult.rows[0] };
      } catch (e) {
        return {
          error: e.message
        };
      }
    },

    async returnBook(parent, { book_id }, { postgres }, info) {
      try {
        const checkStatusQuery = {
          text: `SELECT * FROM libraryapp.books WHERE id=$1`,
          values: [book_id]
        };

        const returnBookQuery = {
          text:
            "UPDATE libraryapp.books SET status = 'Available', borrower_id = null WHERE id = $1 AND status = 'Lent' RETURNING *",
          values: [book_id]
        };

        const checkStatusResult = await postgres.query(checkStatusQuery);

        if (!checkStatusResult.rows[0]) {
          return { error: "We don't have this book!" };
        }

        if (checkStatusResult.rows[0].status == "Available") {
          return { error: "Book Has Not Been Borrowed Yet!" };
        }

        const returnBookResult = await postgres.query(returnBookQuery);

        console.log(returnBookResult);
        return { book: returnBookResult.rows[0] };
      } catch (e) {
        return {
          error: e.message
        };
      }
    },

    async addBook(
      parent,
      { title, author, library_id },
      { app, req, authUtil, postgres },
      info
    ) {
      const userRole = authUtil.authenticate(app, req).role; // saves authenticated ID in the borrower_id variable. .authenticate function returns userID.
      // console.log(userRole);
      if (userRole != "librarian") {
        // console.log("Role Issue");
        return { error: "Unauthorized to Add Book" };
      }
      const addBookQuery = {
        text:
          "INSERT INTO libraryapp.books (title, author, library_id) VALUES ($1, $2, $3) RETURNING *",
        values: [title, author, parseInt(library_id)]
      };

      const addBookResult = await postgres.query(addBookQuery);
      const book = addBookResult.rows[0];
      // const title = addBookResult.rows[0]["title"];
      // const author = addBookResult.rows[0]["author"];
      // const library = addBookResult.rows[0]["library_id"];
      return {
        book
      };
    },

    async toggleOpen(
      parent,
      { library_id },
      { app, req, authUtil, postgres },
      info
    ) {
      const userRole = authUtil.authenticate(app, req).role;
      // console.log(userRole);
      if (userRole != "librarian") {
        console.log("Role Issue");
        return { error: "Unauthorized to Add Book" };
      }
      const openCloseQuery = {
        text:
          "UPDATE libraryapp.libraries SET open = NOT open WHERE id = $1 RETURNING*",
        values: [library_id]
      };
      // console.log(req.body.id);
      const openCloseResult = await postgres.query(openCloseQuery);
      library = openCloseResult.rows[0];
      console.log(library);
      return { library };
    },

    async addLibrary(
      parent,
      { name, address },
      { app, req, authUtil, postgres },
      info
    ) {
      const userRole = authUtil.authenticate(app, req).role;
      // console.log(userRole);
      if (userRole != "librarian") {
        console.log("Role Issue");
        return { error: "Unauthorized to Add Book" };
      }
      const addLibraryQuery = {
        text:
          "INSERT INTO libraryapp.libraries (open, name, address) VALUES (true, $1,$2) RETURNING *",
        values: [name, address]
      };
      const addLibraryResult = await postgres.query(addLibraryQuery);
      library = addLibraryResult.rows[0];
      return { library };
    },

    async signup(parent, { input }, { app, req, authUtil, postgres }, info) {
      try {
        const hashedPassword = await bcrypt.hash(input.password, saltRounds);
        // console.log(hashedPassword);

        const signupQuery = {
          text:
            "INSERT INTO libraryapp.users (name, email, password, address, role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
          values: [
            input.name,
            input.email.toString().toLowerCase(),
            hashedPassword,
            input.address,
            "user"
          ]
        };
        const signupResults = await postgres.query(signupQuery);
        const user = signupResults.rows[0];
        const csrfTokenBinary = crypto.randomBytes(32);
        const csrfToken = Buffer.from(csrfTokenBinary, "binary").toString(
          "base64"
        );

        const token = authUtil.generateToken(
          user,
          input.library_id,
          app.get("JWT_SECRET"),
          csrfToken
        );

        authUtil.setCookie(app.get("JWT_TOKEN_NAME"), token, req.res);

        const addToLibraryQuery = {
          text:
            "INSERT INTO libraryapp.libraries_users (library_id, user_id) VALUES ($1,$2)",
          values: [input.library_id, signupResults.rows[0]["id"]]
        };

        const addToLibraryResult = await postgres.query(addToLibraryQuery);

        // console.log(signupResults.rows);
        return {
          user,
          csrfToken
        };
      } catch (e) {
        console.log(e);
        return {
          error: "Something Broke Mothafucka"
        };
      }
    },

    async banUser(parent, { id }, { app, req, authUtil, postgres }, info) {
      const userRole = authUtil.authenticate(app, req).role;

      if (userRole != "librarian") {
        console.log("Role Issue");
        return { error: "Unauthorized to Add Book" };
      }

      const banUserQuery = {
        text:
          "UPDATE libraryapp.users SET banned = NOT banned WHERE id =$1 RETURNING *",
        values: [id]
      };
      const banUserResults = await postgres.query(banUserQuery);
      // console.log(banUserResults);
      user = banUserResults.rows[0];
      return { user };
    },

    async removeBook(parent, { id }, { app, req, authUtil, postgres }, info) {
      const userRole = authUtil.authenticate(app, req).role; // saves authenticated ID in the borrower_id variable. .authenticate function returns userID.
      // console.log(userRole);
      if (userRole != "librarian") {
        console.log("Role Issue");
        return { error: "Unauthorized to Add Book" };
      }
      const removeBookQuery = {
        text: "DELETE FROM libraryapp.books WHERE id = $1 RETURNING *",
        values: [id]
      };
      const removeBookResults = await postgres.query(removeBookQuery);
      const book = removeBookResults.rows[0];
      console.log(book);
      return { book };
    },

    async joinLibrary(
      parent,
      { library_id },
      { app, req, authUtil, postgres },
      info
    ) {
      const user = authUtil.authenticate(app, req).userID;
      console.log(user);
      const joinLibraryQuery = {
        text:
          "INSERT INTO libraryapp.libraries_users (library_id, user_id) VALUES ($1, $2) RETURNING * ",
        values: [library_id, user]
      };
      const joinLibraryResults = await postgres.query(joinLibraryQuery);

      const displayLibraryQuery = {
        text: "SELECT * FROM libraryapp.libraries WHERE id = $1",
        values: [library_id]
      };
      const displayLibraryResults = await postgres.query(displayLibraryQuery);
      return displayLibraryResults.rows[0];
    },
    async leaveLibrary(
      parent,
      { library_id },
      { app, req, authUtil, postgres },
      info
    ) {
      const user = authUtil.authenticate(app, req).userID;
      console.log(user);
      const leaveLibraryQuery = {
        text:
          "DELETE FROM libraryapp.libraries_users WHERE library_id=$1 AND user_id = $2 RETURNING * ",
        values: [library_id, user]
      };
      const leaveLibraryResults = await postgres.query(leaveLibraryQuery);

      const displayLibraryQuery = {
        text: "SELECT * FROM libraryapp.libraries WHERE id = $1",
        values: [library_id]
      };
      const displayLibraryResults = await postgres.query(displayLibraryQuery);
      return displayLibraryResults.rows[0];
    },

    async login(
      parent,
      { email, password },
      { app, req, postgres, authUtil },
      info
    ) {
      try {
        const loginQuery = {
          text: "SELECT * FROM libraryapp.users WHERE email=$1",
          values: [email.toString().toLowerCase()]
        };

        const loginResult = await postgres.query(loginQuery);
        const user = loginResult.rows[0];

        if (!user) {
          return {
            error: "Email or Password is Invalid"
          };
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
          return {
            error: "Email or Password is Invalid"
          };
        }

        if (user.banned) {
          return {
            error: "You've been banned!"
          };
        }
        const libraryIDQuery = {
          text:
            "SELECT library_id FROM libraryapp.libraries_users WHERE user_id=$1",
          values: [user.id]
        };

        const libraryIDResult = await postgres.query(libraryIDQuery);
        const libraryID = libraryIDResult.rows[0].library_id;
        const csrfTokenBinary = crypto.randomBytes(32);
        const csrfToken = Buffer.from(csrfTokenBinary, "binary").toString(
          "base64"
        );
        const token = authUtil.generateToken(
          user,
          libraryID,
          app.get("JWT_SECRET"),
          csrfToken
        );
        authUtil.setCookie(app.get("JWT_TOKEN_NAME"), token, req.res);

        return {
          user,
          csrfToken
        };
      } catch (e) {
        return {
          error: e.message
        };
      }
    }
  }
};
