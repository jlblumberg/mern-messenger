import express from 'express';
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(require("./lib/routes.js"))

app.listen(3000, () => {
  console.log('Connected');
});

module.exports = app;