import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'


const Blog = () => {
  const [visible, setVisible] = useState(false);
  const blogs = useSelector(state => state.blogs)
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const infoVisibility = (id) => {
    setVisible((prevVisible) => ({
      ...prevVisible,
      [id]: !prevVisible[id],
    }));
  };

  return (
    <div>
    {[...blogs].sort(function (a, b) {
        if (a.likes > b.likes) {
          return -1;
        }
        if (a.likes < b.likes) {
          return 1;
        }
        return 0;
      })
      .map(blog => 
    <div style={blogStyle} key={blog.id}>
      <li style={{ display: visible[blog.id] ? 'none' : '' }} className="blogOculto">
      <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
      </li>
    </div>
   )}
   </div>
  );
};

export default Blog;
