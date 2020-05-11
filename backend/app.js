import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send({val: 'Hello, World.'})
});

app.listen(3000);

export default app