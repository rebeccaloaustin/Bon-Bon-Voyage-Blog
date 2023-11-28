require('dotenv').config()

//DEPENDENCIES
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require('method-override')
const blogController = require('./controllers/blog.js')
const MONGOURI = process.env.MONGOURI

//DATABASE CONNECTION
mongoose.connect(MONGOURI + 'blog', {
  useNewUrlParser: true,
});
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use('/blog', blogController)
app.use(express.static('public'));

//HOME ROUTE
app.get('/', (req, res) => {
  res.render('home.ejs');
})

app.listen(3000, () => {
  console.log(`listening on port 3000`);
});