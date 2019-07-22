const express = require('express');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/favicon.ico', (req, res) => res.status(204));

app.listen(3000, () => {
  console.log('Server is listening to port 3000');
})
