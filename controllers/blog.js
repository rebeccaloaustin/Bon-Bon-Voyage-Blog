const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

//I.N.D.U.C.E.S.

//SEED
router.get('/seed', (req, res)=>{
  Blog.create([{
    title: "Costa Rica",
    preview: "The art of slow living is something yet to be mastered by the Western world.",
    content: "Costa Rica lives up to it's name. From year-round tropical climate, beaches, mountains, lush valleys and rainforests, Costa Rica has it all. It's a different way of life.",
    content2: "Fresh coconuts galore! Each day spent on the peninsula, I started my days with chilled coconut water which naturally gave me the stamina to explore.",
    quote: "Pura Vida. It means 'pure life', but the true meaning really is more along the lines of 'life is good'.",
    img: ["public/css/photos/bananas.jpeg"],
    date: "August 22, 2021",
}], (err, data)=>{
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