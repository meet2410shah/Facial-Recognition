const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
})

app.listen(3000, () => {
  console.log('Server is listening to port 3000');
})
