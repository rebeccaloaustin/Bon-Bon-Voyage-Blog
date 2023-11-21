const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');
const Destination = require('../models/destination');

//I.N.D.U.C.E.S.

//SEED
router.get('/seed', (req, res)=>{
  Destination.create([{
    name: 'Europe'
  },
  {
    name: 'Asia & Oceania'
  },
  {
    name: 'Africa'
  },
  {
    name: 'North America'
  },
  {
    name: 'Caribbean & Central America'
  },
  {
    name: 'Middle East'
  },
], (err, data)=>{
  res.redirect('/blog')
})
})
//DESTINATIONS
router.get("/destinations", (req, res) => {
  res.render("destinations.ejs");
});

//ABOUT
router.get("/about", (req, res) => {
  res.render("about.ejs");
});
//INDEX
router.get("", (req, res) => {
  Blog.find({}, (error, allBlogs) => {
    res.render("blog.ejs", {
      blog: allBlogs
    });
  });
});
//NEW
router.get("/new", (req, res) => {
  // Fetch all destinations
  Destination.find({}, (error, allDestinations) => {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      console.log("Destinations:", allDestinations);
      res.render("blogNew.ejs", { destinations: allDestinations });
    }
  });
});
//DELETE

//UPDATE

//CREATE
router.post("/", (req, res) => {
  // Extract the destination ID from the form data
  const destinationId = req.body.destination;

  // Create a new blog post with the specified destination
  Blog.create({ ...req.body, destination: destinationId }, (error, createdBlog) => {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      res.redirect('/blog');
    }
  });
});
//EDIT

//SHOW
router.get('/:id', (req, res)=>{
  Blog.findById(req.params.id, (err, selectedBlog)=>{
      res.render('blogShow.ejs', {
          blog: selectedBlog
      });
  });
});








module.exports = router;