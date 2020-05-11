import express from 'express';
import MessageApp from './lib/model';

const app = express();
let messageApp = new MessageApp('/json/testMessages.json')

app.get('/', async(req, res) => {
  let result = messageApp.getAll();
    res.json(result);
});

app.listen(3000, () => {
  console.log('Connected');
});

export default app;