const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

const authenticate = (app, req) => {
  const tokenName = app.get("JWT_TOKEN_NAME");
  const jwtCookie = req.cookies[tokenName]; // [] accesses variables in objects.
  const secret = app.get("JWT_SECRET");

  // console.log("Token Name: ", tokenName);
  // console.log("JWT Cookie: ", jwtCookie);
  // console.log("secret: ", secret);
  try {
    const { userID, role, csrfToken, exp, library } = jwt.verify(
      jwtCookie,
      secret
    );
    console.log(role);
    console.log(req.get("authorization"));
    const headerCSRFToken = req.get("authorization").replace("Bearer ", "");

    console.log("Header Token: ", headerCSRFToken);
    console.log("Cookie Token: ", csrfToken);

    const isValidCSRF =
      headerCSRFToken === csrfToken && exp > Math.floor(Date.now() / 1000); // checks to see if CSRF token in cookie is equal to header CSRF token & whether or not the cookie is expired
    console.log("isvalidCSRF: ", isValidCSRF);
    if (!isValidCSRF) {
      throw new AuthenticationError("Unauthorized");
    }
    return { userID, role, library };
  } catch (e) {
    throw new AuthenticationError("Unauthorized");
  }
};

module.exports = authenticate;
