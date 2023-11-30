const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

//I.N.D.U.C.E.S.

//SEED
router.get('/seed', (req, res)=>{
  Blog.create([{
    title: "France",
    preview: "When in France, do as the French do.",
    content: "Ah, France, the culinary maestro of the world, where every meal is a poetic symphony and every bite an ode to gastronomic bliss. In the heart of Paris, where the Eiffel Tower watches over the city like a culinary connoisseur, you'll find bustling patisseries tempting you with flaky croissants and decadent éclairs. Venture into the vibrant markets, like Marché Bastille, where the scent of ripe cheeses and freshly baked baguettes wafts through the air, inviting you to indulge in a fromage feast.",
    contentTwo: "France is a canvas of flavors, from the buttery escargot of Burgundy to the savory ratatouille of Provence. And let's not forget the pièce de résistance, a perfectly cooked coq au vin or a delicate bouillabaisse that transports you to the sun-soaked shores of Marseille. In France, every meal is a masterpiece, and each bite is a journey through the rich tapestry of culinary excellence. Bon appétit!",
    quote: "“To know Paris is to know a great deal.” – Henry Miller",
    img: "https://i.pinimg.com/originals/2f/09/a6/2f09a6d806be51ccc437c59da53a6f5d.png",
  imgTwo:"https://i.pinimg.com/originals/f7/62/c2/f762c25e4065f66f7b4cd21b5d8911af.jpg",
  imgThree: "https://i.pinimg.com/originals/f2/c7/19/f2c7193850575fe9dda2ea407fa9ca4e.jpg",
  imgFour: "https://i.pinimg.com/474x/bf/b8/78/bfb878a3f9a21b06da7a2c74a3f7f221.jpg",
    date: "March 1st, 2020",
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