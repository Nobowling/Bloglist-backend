const mongoose = require('mongoose')
const mongoUrl = 'mongodb://tinde:passu700@ds225703.mlab.com:25703/bloglist'
mongoose.connect(mongoUrl)

const Blog = mongoose.model('Blog', {
  title: String,
  author: String,
  url: String,
  likes: Number
})

module.exports = Blog