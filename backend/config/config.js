var config = {
  port: process.env.NODE_ENV === 'test' ? 1000 : 3000,
  db: process.env.NODE_ENV === 'test' ? 'mongodb://localhost/testMessages' : 'mongodb://localhost/messages',
}
module.exports = config;