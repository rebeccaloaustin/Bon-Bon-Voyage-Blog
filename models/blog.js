const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  img: String,
  created: { type: Date, default: Date.now },
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Destination",
    required: true,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;