const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  preview: String,
  content: { type: String, required: true },
  contentTwo: String,
  quote: String,
  img: String,
  imgTwo:String,
  imgThree: String,
  imgFour: String,
  date: String,
  createdAt: { type: Date, default: Date.now },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;