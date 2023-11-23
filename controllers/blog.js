const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

//I.N.D.U.C.E.S.

//SEED
router.get('/seed', (req, res)=>{
  Blog.create([{
  title: 'article',
  content: 'this is my content',
  img: 'https://www.ikea.com/us/en/images/products/fejka-artificial-potted-plant-indoor-outdoor-succulent__1090892_pe862200_s5.jpg?f=s'
  },
], (err, data)=>{
  res.redirect('/blog')
})
})


//ABOUT
router.get("/about", (req, res) => {
  res.render("about.ejs");
});
//INDEX
router.get("", (req, res) => {
  Blog.find({}, (error, allBlogs) => {
    res.render("index.ejs", {
      blog: allBlogs
    });
  });
});
//NEW
router.get("/new", (req, res) => {
  res.render("new.ejs");
});
//DELETE
router.delete("/:id", (req, res) => {
  Blog.findByIdAndRemove(req.params.id, (err, data) => {
      res.redirect('/blog')
  })
})
//UPDATE
router.put('/:id', (req, res)=>{
  Blog.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
      res.redirect('/blog')
  })
})
//CREATE
router.post("/", (req, res) => {
  Blog.create(req.body, (error, createdBlog) => {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
        res.redirect('/blog');
    }
  });
});
//EDIT
router.get('/:id/edit', (req, res)=>{
  Blog.findById(req.params.id, (err, selectedBlog)=>{
      res.render(
      'edit.ejs',
      {
        blog: selectedBlog
      }
    )
  })
})

//SHOW
router.get('/:id', (req, res)=>{
  Blog.findById(req.params.id, (err, selectedBlog)=>{
      res.render('show.ejs', {
          blog: selectedBlog
      });
  });
});








module.exports = router;