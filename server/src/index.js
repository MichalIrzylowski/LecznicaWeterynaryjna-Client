import express from 'express';

const app = express();
const Port = 8080;

app.post('/api/lecznica_weterynaryjna/user_register', (req, res) => {
  console.log(req.body)
})

app.listen(PORT, () => console.log(`Magic happens at port ${PORT}`))
