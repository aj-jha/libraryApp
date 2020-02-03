const jwt = require("jsonwebtoken")

const generateToken = (user, library_id, secret, csrfToken) => {
  const payload = {
    userID: user.id,
    library: library_id,
    csrfToken,
    exp: Math.floor(Date.now() / 1000) + 2 * (60 * 60),
    role: user.role
  }

  return jwt.sign(payload, secret)
}

module.exports = generateToken
