const Blog = require('../models/blog')

const initialBlogs = [
    {
        id:"65be499c0bff0d1eb0520408",
        title:"Prueba1",
        author:"Yo",
        url:".com",
        likes:3
      },
    {
      id:"65be8a5f921eaf9923508e6f",
      title:"Prueba",
      author:"Nadie",
      url:"www",
      likes:1
    }
  ]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb
}