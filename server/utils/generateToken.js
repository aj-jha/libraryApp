const jwt = require("jsonwebtoken");

const generateToken = (user, secret, csrfToken) => {
  const payload = {
    userID: user.id,
    csrfToken,
    exp: Math.floor(Date.now() / 1000) + 2 * (60 * 60),
    role: user.role
  };

  return jwt.sign(payload, secret);
};

module.exports = generateToken;
