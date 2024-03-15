import React from 'react'
import { useState } from 'react'

const Blog = ({ likeBlog, blog, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const infoVisibility = () => {
    setVisible(!visible)
  }

  const updateBlog = (event) =>{
    event.preventDefault();
    likeBlog ({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes += 1,
      id: blog.id
    })
  }
  const deleteBlog = (event) =>{
    event.preventDefault();
    removeBlog (blog)
  }
  return (
    <div style={blogStyle}>
      <li style={hideWhenVisible} className='blogOculto'>
        {blog.title} {blog.author}
        <button id='view-button' onClick={infoVisibility}>view</button>
      </li>
      <form>
      <div style={showWhenVisible} >
        <li className='blogVisible'>
          <p>{blog.title} <button onClick={infoVisibility}>hide</button></p>
          <p>{blog.url}</p>
          <p id='likesBlog'>{blog.likes} <button type="button" id='like-button' onClick={updateBlog}>like</button></p>
          <p>{blog.author}</p>
          <button id='remove-button' type="button" onClick={deleteBlog}>Remove</button>
        </li>
      </div>
      </form>
  </div>
)}
export default Blog