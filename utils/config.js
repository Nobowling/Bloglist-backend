let port;
let mongoUrl;

require('dotenv').config()

if (process.env.NODE_ENV === 'production') {
  port = process.env.PORT
  mongoUrl = process.env.MONGODB_URI
}
else if (process.env.NODE_ENV === 'test') {
  port = process.env.TEST_PORT
  mongoUrl = process.env.TEST_MONGODB_URI
}

module.exports = {
  mongoUrl,
  port
}