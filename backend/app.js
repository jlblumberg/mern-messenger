import express from 'express';
import routes from './lib/routes.js'
const app = express();
import bodyParser from 'body-parser';

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(routes);

app.listen(3000, () => {
  console.log('Connected');
});

export default app;
