const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');


const generateShit = require('./generateShit');

const app = express();

const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }));
app.set('view engine', 'hbs');


app.get('/', (req, res) => {
  res.render('index')
});
app.post('/', (req, res) => {
  const target = req.body.whichOne;
  let isEnginner, isEntrepreneur, isDesigner;
  if (target === "engineer") {
    isEnginner = true

  } else if (target === "designer") {
    isDesigner = true;
  } else if (target === "entrepreneur") {
    isEntrepreneur = true;
  }

  if (!target) {
    const notSelect = true;
    res.render('index', { notSelect })
    return
  }
  // console.log(isEnginner)
  res.render('index', { displayArea: generateShit(target), isEnginner, isDesigner, isEntrepreneur })
});
app.listen(port, (error) => {
  if (error) console.log(error);
  console.log(`operate http://localhost:${port} successfully`);

});